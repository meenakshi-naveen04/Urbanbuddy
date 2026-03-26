import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App.jsx'; // This imports the file you just showed me

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//REVIEW AND RATING


const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

exports.updateProviderRating = onDocumentCreated("reviews/{reviewId}", async (event) => {
    const newReview = event.data.data();
    const providerId = newReview.providerId;
    const newRatingValue = newReview.rating; // e.g., 5

    const db = getFirestore();
    const providerRef = db.collection("providers").doc(providerId);

    try {
        await db.runTransaction(async (transaction) => {
            const providerDoc = await transaction.get(providerRef);

            if (!providerDoc.exists) {
                throw new Error("Provider does not exist!");
            }

            const providerData = providerDoc.data();
            
            // 1. Get current stats or set defaults
            const currentCount = providerData.ratingCount || 0;
            const currentAvg = providerData.averageRating || 0;

            // 2. Calculate New Average
            // Formula: ((CurrentAvg * CurrentCount) + NewRating) / (CurrentCount + 1)
            const newCount = currentCount + 1;
            const newAvg = ((currentAvg * currentCount) + newRatingValue) / newCount;

            // 3. Atomically Update Provider Document
            transaction.update(providerRef, {
                averageRating: parseFloat(newAvg.toFixed(2)), // Round to 2 decimals
                ratingCount: FieldValue.increment(1),
                updatedAt: FieldValue.serverTimestamp()
            });
        });

        console.log(`Updated rating for Provider: ${providerId}`);
    } catch (error) {
        console.error("Rating Update Error:", error);
    }
});

//AUTOMATED PUSH NOTIFICATION

const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { getMessaging } = require("firebase-admin/messaging");
const { getFirestore } = require("firebase-admin/firestore");

exports.notifyUserOnBookingAccept = onDocumentUpdated("bookings/{bookingId}", async (event) => {
    // 1. Check if the status changed to 'accepted'
    const beforeData = event.data.before.data();
    const afterData = event.data.after.data();

    if (beforeData.bookingStatus === "pending" && afterData.bookingStatus === "accepted") {
        const userId = afterData.userId;
        const db = getFirestore();

        try {
            // 2. Fetch the User's FCM tokens from their profile
            const userDoc = await db.collection("users").doc(userId).get();
            const userData = userDoc.data();
            const tokens = userData.fcmTokens || [];

            if (tokens.length === 0) return;

            // 3. Construct the Notification Payload
            const message = {
                notification: {
                    title: "Booking Accepted! ✅",
                    body: `A provider has accepted your request for ${afterData.serviceName}.`,
                },
                // Send to all devices the user is logged into
                tokens: tokens, 
            };

            // 4. Send the message via FCM
            const response = await getMessaging().sendEachForMulticast(message);
            console.log(`${response.successCount} notifications sent successfully.`);

            // 5. Cleanup: Remove invalid tokens if any (Best Practice)
            if (response.failureCount > 0) {
                const failedTokens = [];
                response.responses.forEach((resp, idx) => {
                    if (!resp.success) failedTokens.push(tokens[idx]);
                });
                // Logic to remove failedTokens from database would go here
            }

        } catch (error) {
            console.error("Notification Error:", error);
        }
    }
});

//MAPBOX

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

exports.getCoordinates = async (address) => {
  const response = await geocodingClient.forwardGeocode({
    query: address,
    limit: 1,
    countries: ['in'] // Limit search to India
  }).send();

  const [lng, lat] = response.body.features[0].center;
  return { lat, lng };
};


//RAZORPAY

const crypto = require("crypto");
const { onCall } = require("firebase-functions/v2/https");
const { getFirestore } = require("firebase-admin/firestore");

exports.verifyPaymentAndCompleteBooking = onCall(async (request) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = request.data;
  const db = getFirestore();

  // 1. Security: Generate signature to verify authenticity
  // Your RAZORPAY_SECRET should be stored in Google Secret Manager
  const secret = process.env.RAZORPAY_SECRET; 
  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  // 2. Compare Signatures
  if (generated_signature !== razorpay_signature) {
    return { success: false, message: "Payment verification failed. Potential fraud detected." };
  }

  try {
    // 3. Atomic Database Update (Transaction)
    await db.runTransaction(async (transaction) => {
      const bookingRef = db.collection("bookings").doc(bookingId);
      const bookingDoc = await transaction.get(bookingRef);

      if (!bookingDoc.exists) {
        throw new Error("Booking does not exist!");
      }

      // Update the booking status and payment details
      transaction.update(bookingRef, {
        "paymentDetails.status": "paid",
        "paymentDetails.razorpayPaymentId": razorpay_payment_id,
        "bookingStatus": "accepted",
        "updatedAt": admin.firestore.FieldValue.serverTimestamp()
      });
    });

    return { success: true, message: "Payment verified and booking confirmed!" };

  } catch (error) {
    console.error("Transaction Error:", error);
    return { success: false, message: "Database update failed." };
  }
});

//PROVIDER MATCHING

const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();

exports.findProviders = onCall(async (request) => {
  // 1. Get request data from the app (React/React Native)
  const { serviceId, userLat, userLng } = request.data;
  const db = admin.firestore();

  try {
    // 2. Initial Filtering: Find active providers for this service
    const providersSnapshot = await db.collection("providers")
      .where("services", "array-contains", serviceId)
      .where("isAvailable", "==", true)
      .where("isVerified", "==", true)
      .get();

    let matches = [];

    providersSnapshot.forEach(doc => {
      const data = doc.data();
      
      // 3. Simple Geo-Check (Conceptual)
      // In a real app, use the 'geofire-common' library here for radius checks
      const distance = calculateDistance(userLat, userLng, data.lat, data.lng);
      
      if (distance <= data.serviceRadius) {
        matches.push({
          id: doc.id,
          name: data.displayName,
          rating: data.rating,
          distance: distance
        });
      }
    });

    // 4. Rank: Sort by rating (highest first) and distance (closest first)
    matches.sort((a, b) => b.rating - a.rating || a.distance - b.distance);

    return { success: true, providers: matches.slice(0, 10) };

  } catch (error) {
    console.error("Matching Error:", error);
    return { success: false, error: error.message };
  }
});

// Helper function to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

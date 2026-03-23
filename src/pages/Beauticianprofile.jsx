import { useNavigate, useParams } from "react-router-dom";

function BeauticianProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const beautician = {
    name: "Pushpalatha",
    rating: "4.9",
    exp: "10+ years",
    reviews: [
      "Excellent work!",
      "Very professional",
      "Highly recommended"
    ]
  };

  return (
    <div className="page">

      <h2>💧 {beautician.name}</h2>

      <p>⭐ {beautician.rating}</p>
      <p>Experience: {beautician.exp}</p>

      <h3>Reviews</h3>
      {beautician.reviews.map((r, i) => (
        <p key={i}>✔ {r}</p>
      ))}

      <button onClick={() => navigate("/booking")}>
        Book Now
      </button>

    </div>
  );
}

export default BeauticianProfile;
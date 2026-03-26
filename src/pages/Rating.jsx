import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Rating() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    // VALIDATION
    if (rating === 0) {
      setError("Please select a rating ⭐");
      return;
    }

    if (comment.trim() === "") {
      setError("Please write a review 📝");
      return;
    }

    // SUCCESS
    setError("");
    alert("Thank you for your feedback!");

    // Navigate to home
    navigate("/home");
  };

  return (
    <div className="rating-page">

      <h2>Rate Your Service ⭐</h2>

      {/* STARS */}
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => {
              setRating(star);
              setError("");
            }}
            className={star <= rating ? "active" : ""}
          >
            ⭐
          </span>
        ))}
      </div>

      <p>Your Rating: {rating}</p>

      {/* COMMENT BOX */}
      <textarea
        placeholder="Write your feedback..."
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
          setError("");
        }}
        className="comment-box"
      />

      {/* ERROR MESSAGE */}
      {error && <p className="error">{error}</p>}

      {/* SUBMIT */}
      <button onClick={handleSubmit}>
        Submit
      </button>

      {/* BACK BUTTON */}
      <button
        className="home-btn"
        onClick={() => navigate("/home")}
      >
        ⬅ Back to Home
      </button>

    </div>
  );
}

export default Rating;
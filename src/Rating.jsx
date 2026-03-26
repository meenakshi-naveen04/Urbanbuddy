import { useState } from "react";

function Rating() {
  const [rating, setRating] = useState(0);

  return (
    <div className="rating-page">

      <h2>Rate Your Service ⭐</h2>

      <div className="stars">
        {[1,2,3,4,5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={star <= rating ? "active" : ""}
          >
            ⭐
          </span>
        ))}
      </div>

      <p>Your Rating: {rating}</p>

      <button onClick={() => alert("Thanks for your feedback!")}>
        Submit
      </button>

    </div>
  );
}

export default Rating;
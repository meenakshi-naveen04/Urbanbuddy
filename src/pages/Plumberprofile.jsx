import { useNavigate, useParams } from "react-router-dom";

function PlumberProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const plumber = {
    name: "Mohan K",
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

      <h2>💧 {plumber.name}</h2>

      <p>⭐ {plumber.rating}</p>
      <p>Experience: {plumber.exp}</p>

      <h3>Reviews</h3>
      {plumber.reviews.map((r, i) => (
        <p key={i}>✔ {r}</p>
      ))}

      <button onClick={() => navigate("/booking")}>
        Book Now
      </button>

    </div>
  );
}

export default PlumberProfile;
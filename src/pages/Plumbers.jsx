import { useNavigate } from "react-router-dom";

function Plumbers() {
  const navigate = useNavigate();

  const plumbers = [
    {
      id: 1,
      name: "Mohan K",
      rating: "4.9",
      exp: "10+ years"
    },
    {
      id: 2,
      name: "Suresh P",
      rating: "4.7",
      exp: "6 years"
    }
  ];

  return (
    <div className="page">

      <h2>Nearby Plumbers</h2>

      {plumbers.map((p) => (
        <div
          key={p.id}
          className="provider-card"
          onClick={() => navigate(`/plumber/${p.id}`)}
        >
          <div>
            <h3>💧 {p.name}</h3>
            <p>⭐ {p.rating}</p>
            <p>{p.exp}</p>
          </div>
        </div>
      ))}

    </div>
  );
}

export default Plumbers;
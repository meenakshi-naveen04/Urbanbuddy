import { useNavigate } from "react-router-dom";

function Beautician() {
  const navigate = useNavigate();

  const beauticians = [
    {
      id: 1,
      name: "Pushpalatha",
      rating: "4.9",
      exp: "10+ years"
    },
    {
      id: 2,
      name: "Radha",
      rating: "4.7",
      exp: "6 years"
    }
  ];

  return (
    <div className="page">

      <h2>Nearby Beauticians</h2>

      {beauticians.map((b) => (
        <div
          key={b.id}
          className="provider-card"
          onClick={() => navigate(`/beautician/${b.id}`)}
        >
          <div>
            <h3>💧 {b.name}</h3>
            <p>⭐ {b.rating}</p>
            <p>{b.exp}</p>
          </div>
        </div>
      ))}

    </div>
  );
}

export default Beautician;
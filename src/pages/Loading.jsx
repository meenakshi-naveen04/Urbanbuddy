import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/home");  // 👈 WRITE IT HERE
    }, 3000);
  }, []);

  return (
    <div className="loading-page">
      <h1 className="app-name">Urban <span>Buddy</span></h1>

      <div className="cleaning">🧹</div>

      <p>Getting things ready for you...</p>

      <div className="loader"></div>
    </div>
  );
}

export default Loading;
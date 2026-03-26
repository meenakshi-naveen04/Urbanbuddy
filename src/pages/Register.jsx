import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="form">
      <h2>Create Account</h2>

      <input placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button onClick={() => navigate("/login")}>
        Register
      </button>
    </div>
  );
}

export default Register;
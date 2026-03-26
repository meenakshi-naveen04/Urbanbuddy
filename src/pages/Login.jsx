import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="form">
      <h2>Login</h2>

      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button onClick={() => navigate("/")}>Login</button>

      <p onClick={() => navigate("/register")}>
        New user? Register
      </p>
    </div>
  );
}

export default Login;
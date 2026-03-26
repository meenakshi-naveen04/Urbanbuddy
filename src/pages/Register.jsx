import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firabaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      // 🔐 Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 💾 Save extra user data
      await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        uid: userCredential.user.uid,
        createdAt: new Date()
      });

      alert("Registration Successful ✅");
      navigate("/login");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="form">
      <h2>Create Account</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Register;
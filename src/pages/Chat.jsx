import { useState } from "react";

function Chat() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const sendMsg = () => {
    setChat([...chat, msg]);
    setMsg("");
  };

  return (
    <div>
      <h2>Chat</h2>

      <div className="chat-box">
        {chat.map((c, i) => (
          <p key={i}>{c}</p>
        ))}
      </div>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button onClick={sendMsg}>Send</button>
    </div>
  );
}

export default Chat;
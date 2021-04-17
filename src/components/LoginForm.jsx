import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = {
      "Project-ID": "55a07b87-faab-401b-9b5c-11ec60ae946e",
      "User-Name": username,
      "User-Secret": password,
    };

    try {
      //username/password  => chatengine ->give messages
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });
      //ok -> logged in
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      window.location.reload();
    } catch (error) {
      //else error => try with new username
      setError("Ooops, incorrect credentials...");
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            required
          />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <h2 align="center">{error}</h2>
      </div>
    </div>
  );
};

export default LoginForm;

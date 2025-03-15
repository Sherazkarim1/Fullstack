import "./App.css";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState<{ [key: string]: string }>({});
  const [value, setValue] = useState("");
  // const [content, setContent] = useState({});

  const getMessage = async () => {
    const response = await fetch("http://localhost:3000/");
    const message = await response.json();
    setMessage(message);
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: value }),
    });

    const data = await response.json();
    console.log(data);

    // setContent(data);
  };

  const displayMessage = () => {
    return (
      <>
        {Object.entries(message).map(([key, value]) => (
          <div key={key}>
            <p>
              {key}: {value}
            </p>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <button onClick={getMessage}>Get Message</button>
      <div>{displayMessage()}</div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          name="message"
          id="message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Send Message</button>
      </form>
    </>
  );
}

export default App;

import { useEffect, useRef } from "react";
import "./App.css";

import { io } from "socket.io-client";

function App() {
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:9013");
    console.log(socket);
    socket.current.on("connnection", () => {
      console.log("connected to server");
    });
    socket.current.on('newMessage' , (message)=>{
      alert(message)
    })
  }, []);
  // useEffect(() => {
  //   // Connect to the server
  //   const socket = io();

  //   // Listen for "serverMessage" event
  //   socket.on("newMessage", (message) => {
  //     console.log("Received message from server:", message);
  //     alert()
  //     // Do something with the message, e.g., update state or display it in the UI
  //   });

  //   // Clean up the socket connection when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  const handleClick = () => {
    socket.current.emit("message", new Date().getTime());
  };

  return (
    <div className="App">
      <p>Socket.io app</p>

      <button type="button" onClick={handleClick}>
        Emit a time message
      </button>
    </div>
  );
}

export default App;

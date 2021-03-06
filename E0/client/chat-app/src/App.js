import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from 'axios';

import MessageForm from "./components/MessageForm";
import MessageBubble from './components/MessageBubble';
import "./App.css";

const endpoint = "http://ec2-18-222-97-158.us-east-2.compute.amazonaws.com:5000";
//const endpoint = "http://localhost:5000";
const socket = io(endpoint, { transports: ["polling"] });

const App = () => {
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      const url = `http://api.giphy.com/v1/gifs/search?q=simpsons&api_key=dc6zaTOxFJmzC`;
      const result = await axios.get(url);
      console.log(result);
    };

    fetchData();

    socket.emit("new connection");
    socket.on("new-id", payload => {
      setId(payload.data);
    });
    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("new-message", payload => {
      console.log(payload);
      setMessages([...messages, payload]);
    });

    document.title = `${messages.length} new messages have been emitted`;
  }, [messages]); //only re-run the effect if new message comes in

  const onSubmit = text => {
    socket.emit("new-message", {
      text
    });
  };

  return (
    <div className="container">
      {id && <p>you have this id: {id}</p>}
      <p>{messages.length} messages have been emitted</p>
      <div>
        {messages.map(message => (
          <MessageBubble primary={message.sent_by !== id} key={message.timestamp}>{message.text}</MessageBubble>
        ))}
      </div>
      <MessageForm onSubmit={onSubmit} />
    </div>
  );
};

export default App;

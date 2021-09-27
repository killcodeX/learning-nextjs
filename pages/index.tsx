import react, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import jwt from "jsonwebtoken";

export default function Home() {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("You are not logged in");
  const [secretMessage, setSecretMessage] = useState<string>("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("sexy");
    } else {
      const data = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      let res = data.token;

      if (res) {
        const json = jwt.decode(res) as { [key: string]: string };
        console.log(json);
        setMessage(
          `Welcome ${json.username} and you are ${
            json.admin ? "an admin" : "not admin"
          }`
        );

        const data = await fetch("/api/secret", {
          method: "POST",
          body: JSON.stringify({ token : res }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        if(data.secretAdminCode){
          setSecretMessage(data.secretAdminCode)
        }else{
          setSecretMessage('Not Availabel')
        }
      } else {
        setMessage("Something went wrong");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>{message}</h1>
      <h2>{secretMessage}</h2>
      <div className={`${styles.card} ${styles.grid}`}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="enter username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

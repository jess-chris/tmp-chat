import React, { useState } from "react";


export default function Home() {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [duration, setDuration] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return setErrors({ confirmPassword: "Confirm Password field must be the same as the Password field" });
    }

    const newChat = {
      password,
      confirmPassword,
      duration
    };


    const res = await fetch('/api/chat', {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newChat)
    })

    if (res.ok) {
      const data = await res.json();
      console.log(data)
    }

  }


  return (
    
    <div className="content">

      <h2>Test form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <label>
          Duration up to 2 hours
          <input 
            type="range"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="5"
            max="120"
            required
          />
        </label>
        {duration}
        <button type="submit">Create chat</button>
      </form>
    
    </div>
  )

};
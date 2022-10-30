import React, { useState } from "react"
import PropTypes from 'prop-types'

async function loginUser(credentials){
    return fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

export default function Auth({setToken}) {
  let [authMode, setAuthMode] = useState("signin")

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Iniciar Sesión</h3>
            <div className="text-center">
              No estas registrado aún?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Registrarse
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Correo electrónico</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={e => setUserName(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Aceptar
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Registro</h3>
          <div className="text-center">
            Ya estas registrado?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Iniciar Sesión
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

Auth.propTypes = {
    setToken: PropTypes.func.isRequired
}
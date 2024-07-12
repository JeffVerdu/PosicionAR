import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { Admin } from "../types";

import "../styles/login/login.css";

const initialUser: Admin = {
  username: "",
  password: "",
};

export const Login = () => {
  const [admin, setAdmin] = useState<Admin>(initialUser);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setAdmin({
      ...admin,
      [name]: value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(admin.username, admin.password);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to="/" target="_blank" className="logo-admin">
        PosicionAR!
      </Link>
      <div className="body-login">
        <div className="main-login">
          <div className="login">
            <h3>Ingresar</h3>
            <form onSubmit={handleLogin}>
              <input
                className="input-login"
                type="email"
                name="username"
                value={admin.username}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <input
                className="input-login"
                type="password"
                name="password"
                value={admin.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <button className="button-login" type="submit">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

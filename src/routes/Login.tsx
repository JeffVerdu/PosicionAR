import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

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
      toast.success(`Ha ingresado correctamente`, {
        style: { fontSize: "2rem" },
      });
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (error) {
      toast.error(`Usuario o contraseña incorrectos`, {
        style: { fontSize: "2rem" },
      });
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
      <Toaster />
    </div>
  );
};

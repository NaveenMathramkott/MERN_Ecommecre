import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const Register = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/register`,
        {
          name,
          password,
          email,
          admin: isAdmin,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
      } else {
        toast.error(res.data.message);
      }
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <Layout title={`Register Ecommerce app`}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <form onSubmit={handleSubmit}>
            <h3>REGISTER</h3>
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                What is your favorite sport?
              </label>
              <input
                type="text"
                className="form-control"
                id="inputText"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="adminCheck"
                value={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="adminCheck">
                Admin?
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Register
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;

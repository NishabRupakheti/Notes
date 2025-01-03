import React, { useContext, useState } from "react";
import Context from "../Stores/contextProvider";
import axios from "axios";

const Login = () => {
  const [emailf, setemailf] = useState("");
  const [passwordf, setpasswordf] = useState("");
  const { changeLogState, setToken, setIsAuthenticated } = useContext(Context);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (passwordf.length < 6 || emailf.length == 0) {
      setError("Too short passoword or email");
    } else {
      try {
        const result = await axios.post("http://localhost:4000/api/login", {
          email: emailf,
          password: passwordf,
        });
        const token = result.data["token"];
        if (token) {
          localStorage.setItem("token", token);
          setToken(token);
          setIsAuthenticated(true);
        }
      } catch (err) {
        if (err.response.status == 400) {
          setError("Credentials not matched");
          setpasswordf("");
        }
        console.log("Failed to send the request", err);
      }
    }
  };

  return (
    <>
      <div className="container-fluid mainContainer">
        <form
          className="mx-auto p-4 shadow-lg rounded bg-light"
          style={{ maxWidth: "400px" }}
        >
          <h4
            className="text-center alert alert-info"
            style={{ fontFamily: "monospace", fontWeight: "bold" }}
          >
            Login
          </h4>
          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={emailf}
              onChange={(e) => setemailf(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="inputPassword6" className="form-label">
              Password
            </label>
            <input
              value={passwordf}
              onChange={(e) => setpasswordf(e.target.value)}
              type="password"
              id="inputPassword6"
              className="form-control"
              aria-describedby="passwordHelpInline"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-4"
            onClick={handleLogin}
          >
            Login
          </button>

          <div className="text-center mt-3">
            <a href="#" className="text-muted" onClick={changeLogState}>
              Don't have an account? <span className="text-info">Register</span>
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

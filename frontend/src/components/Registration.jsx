import React, { useContext, useState } from "react";
import Context from "../Stores/contextProvider";
import axios from "axios";

const Registration = () => {
  const { changeLogState } = useContext(Context);
  const [emailf, setEmailf] = useState("");
  const [passwordf, setPasswordf] = useState("");
  const [error, setError] = useState();

  const removeErrorTimer = () => {
    setTimeout(() => {
      setError("");
    }, 2000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://127.0.0.1:4000/api/register", {
        email: emailf,
        password: passwordf,
      });
      console.log(result);
      if (result.status == 201) {
        setEmailf("");
        setPasswordf("");
        setError("Success");
        removeErrorTimer();
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 409) {
        setError("User already exist");
      }
      if (err.response.status === 400) {
        setError("Password criteria  mismatched");
        setPasswordf("");
        removeErrorTimer();
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <form
          className="mx-auto p-4 shadow-lg rounded bg-light"
          style={{ maxWidth: "400px" }}
          onSubmit={handleRegister}
        >
          <h4
            className="text-center alert alert-info"
            style={{ fontFamily: "monospace", fontWeight: "bold" }}
          >
            Register
          </h4>
          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              value={emailf}
              onChange={(e) => setEmailf(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="inputPassword6" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={passwordf}
              onChange={(e) => setPasswordf(e.target.value)}
              id="inputPassword6"
              className="form-control"
              aria-describedby="passwordHelpInline"
              required
              placeholder="Enter your password"
            />
            <small
              id="passwordHelpInline"
              className="form-text text-muted mt-1"
            >
              Must be 6-20 characters long.
            </small>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-4">
            Register
          </button>

          <div className="text-center mt-3">
            <a href="#" className="text-muted" onClick={changeLogState}>
              Already have an account? <span className="text-info">Login</span>
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;

import React, { useContext, useEffect, useState } from "react";
import Context from "../Stores/contextProvider";
import axios from "axios";
import NoDTA from "./NoDTA";
import { FaRegEdit } from "react-icons/fa";

const GetCompo = () => {
  const { data, getFunction, token } = useContext(Context);
  const [rerendering, setRerendering] = useState(true);
  const [updateState, setUpdateState] = useState(true);
  const [inputf, setInputf] = useState({});
  const [showInput, setShowInput] = useState({});

  useEffect(() => {
    getFunction();
  }, [rerendering, updateState]);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:4000/api/message", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          id: id,
        },
      });

      setRerendering(!rerendering);
    } catch (err) {
      console.error("Error while deleting the post", err);
    }
  };

  const handleUpdate = async (id) => {
    if (showInput[id]) {
      try {
        await axios.put(
          "http://localhost:4000/api/message",
          {
            id: id,
            message: inputf[id] || "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInputf((prevState) => ({ ...prevState, [id]: "" }));
        setUpdateState(!updateState);
        setShowInput((prevState) => ({ ...prevState, [id]: false }));
      } catch (err) {
        console.error("Cannot send the put request", err);
      }
    }
  };

  const spawnInputField = (id) => {
    setShowInput((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleInputChange = (id, value) => {
    setInputf((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <>
      {data.length > 0 ? (
        data.map((item) => (
          <div
            key={item._id}
            className="card shadow-lg mb-4 rounded"
            style={{ width: "100%" }}
          >
            <div className="card-header text-center bg-primary text-white rounded-top">
              <strong>ID:</strong> {item._id}
            </div>
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between align-items-center">
                {item.title}
                <FaRegEdit
                  style={{ cursor: "pointer", color: "#007bff" }}
                  onClick={() => spawnInputField(item._id)}
                />
              </h5>

              {showInput[item._id] && (
                <input
                  type="text"
                  value={inputf[item._id] || ""}
                  onChange={(e) => handleInputChange(item._id, e.target.value)}
                  className="form-control mb-3"
                  placeholder="Edit"
                  style={{ borderRadius: "5px", borderColor: "#007bff" }}
                />
              )}

              <p className="card-text">{item.message}</p>

              <div className="d-flex justify-content-between">
                <button
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item._id)}
                  style={{ transition: "background-color 0.3s ease" }}
                >
                  Delete
                </button>
                <button
                  href="#"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleUpdate(item._id)}
                  style={{ transition: "background-color 0.3s ease" }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <NoDTA />
      )}
    </>
  );
};

export default GetCompo;

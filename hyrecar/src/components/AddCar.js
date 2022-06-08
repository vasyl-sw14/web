import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const AddCar = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    const formData = new FormData();
    formData.append("make", make);
    formData.append("model", model);
    formData.append("year", year);

    fetch("http://127.0.0.1:8080/api/v1/addCar", {
      method: "POST",
      body: formData,
      headers,
    })
      .then(async (response) => {
        if (response.status !== 200) {
          throw new Error(await response.text());
        }

        return response.json();
      })
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        setErrorMessage(e.message);
      });
  };

  return (
    <>
      <Header />
      <div className="content">
        <p className="headline">Add new car</p>
        <input
          type="text"
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button onClick={() => handleClick()}>Add car</button>
        <div id="error_message">{errorMessage}</div>
      </div>
    </>
  );
};

export default AddCar;

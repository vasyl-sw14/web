import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

const EditCar = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const headers = new Headers();
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);

      fetch(`http://127.0.0.1:8080/api/v1/car/${id}`, { headers })
        .then(async (response) => {
          if (response.status !== 200) {
            throw new Error(await response.text());
          }

          return response.json();
        })
        .then((json) => {
          setMake(json.make);
          setModel(json.model);
          setYear(json.year);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }, []);

  const handleClick = () => {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    const formData = new FormData();
    formData.append("make", make);
    formData.append("model", model);
    formData.append("year", year);

    fetch(`http://127.0.0.1:8080/api/v1/car/${id}`, {
      method: "PUT",
      body: formData,
      headers,
    })
      .then(async (response) => {
        if (response.status !== 200) {
          throw new Error(await response.text());
        }

        return response.text();
      })
      .then(() => {
        navigate("/myCars");
      })
      .catch((e) => {
        setErrorMessage(e.message);
      });
  };

  return (
    <>
      <Header />
      <div className="content">
        <p className="headline">Edit car</p>
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
        <button onClick={() => handleClick()}>Edit</button>
        <div id="error_message">{errorMessage}</div>
      </div>
    </>
  );
};

export default EditCar;

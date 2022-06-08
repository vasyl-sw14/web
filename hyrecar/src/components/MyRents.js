import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const MyRents = () => {
  const [rents, setRents] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);

    fetch("http://127.0.0.1:8080/api/v1/rents", {
      headers,
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error();
        }

        return response.json();
      })
      .then((json) => {
        setRents(json.result);
        setUserEmail(json.email);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  const deleteHandler = (id) => {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);

    fetch(`http://127.0.0.1:8080/api/v1/rent/${id}`, {
      method: "DELETE",
      headers,
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error();
        }

        return response.text();
      })
      .then(() => {
        setRents(rents.filter((rent) => rent.id !== id));
      })
      .catch((e) => {
        console.log(e);
        // localStorage.removeItem("token");
        // navigate("/login");
      });
  };

  return (
    <>
      <Header />
      <div className="home">
        <p className="headline">My rentals</p>
        {rents.map((rent) => {
          return (
            <div
              key={rent.id}
              className="rentData"
              style={{
                backgroundColor:
                  rent.renter === userEmail ? "#4773F3" : "#09cb15",
              }}
            >
              <div className="row">
                <div>
                  <p className="text">Date: {rent.date}</p>
                  <p className="text">Renter: {rent.renter}</p>
                  <p className="text">
                    Duration: {rent.duration}{" "}
                    {rent.duration > 1 ? "days" : "day"}
                  </p>
                </div>
                {rent.renter === userEmail ? (
                  <button
                    className="rentDelete"
                    onClick={() => deleteHandler(rent.id)}
                  >
                    Delete
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyRents;

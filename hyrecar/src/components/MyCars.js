import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const MyCars = () => {
  const [cars, setCars] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);

    fetch("http://127.0.0.1:8080/api/v1/myCars", {
      headers,
    })
      .then(async (response) => {
        if (response.status !== 200) {
          throw new Error(await response.text());
        }

        return response.json();
      })
      .then((json) => {
        console.log(json.cars);
        setCars(json.cars);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  const deleteCar = (id) => {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);

    fetch(`http://127.0.0.1:8080/api/v1/car/${id}`, {
      method: "DELETE",
      headers,
    })
      .then(async (response) => {
        if (response.status !== 200) {
          throw new Error(await response.text());
        }

        return response.text();
      })
      .then(() => {
        setCars(cars.filter((car) => car.id !== id));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <Header />
      <div className="home">
        <p className="headline">My cars</p>

        {cars.map((car) => {
          return (
            <div className="car" key={car.id}>
              <p className="text">
                {car.make} {car.model} {car.year}
              </p>
              <div>
                <button
                  className="rent"
                  onClick={() => navigate(`/editCar/${car.id}`)}
                >
                  Edit
                </button>
                <button
                  className="rentDelete"
                  onClick={() => deleteCar(car.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyCars;

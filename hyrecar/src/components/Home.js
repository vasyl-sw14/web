import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Header from "./Header";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [carId, setCarId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    fetch("http://127.0.0.1:8080/api/v1/cars")
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

  return (
    <div>
      <Header />
      <div className="home">
        <div className="row">
          <p className="headline">Cars list</p>
          <div>
            <button onClick={() => navigate("/myCars")}>My cars</button>
            <button onClick={() => navigate("/myRentals")}>My rentals</button>
            <button onClick={() => navigate("/addCar")}>Add car</button>
            <button onClick={() => navigate("/profile")}>Profile</button>
          </div>
        </div>
        <Modal
          isOpen={carId != null}
          ariaHideApp={false}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <ModalContent carId={carId} onClose={() => setCarId(null)} />
        </Modal>

        {cars.map((car) => (
          <div className="car" key={car.id}>
            <p className="text">
              {car.make} {car.model} {car.year}
            </p>
            <button
              onClick={() => {
                setCarId(car.id);
              }}
              className="rent"
            >
              Rent
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ModalContent = ({ carId, onClose }) => {
  const [duration, setDuration] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const rent = () => {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);

    let formData = new FormData();
    formData.append("carId", carId);
    formData.append("duration", duration);

    fetch("http://127.0.0.1:8080/api/v1/rent", {
      method: "POST",
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
        onClose();
      })
      .catch((e) => {
        setErrorMessage(e.message);
      });
  };

  return (
    <div>
      <p className="headline">Rent confirmation</p>
      <p className="text">Duration</p>
      <input
        type="number"
        value={duration}
        onChange={(e) => {
          if (e.target.value > 0) setDuration(e.target.value);
        }}
      />
      <div id="error_message">{errorMessage}</div>
      <div className="row">
        <div />
        <div>
          <button onClick={() => rent()}>Rent</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

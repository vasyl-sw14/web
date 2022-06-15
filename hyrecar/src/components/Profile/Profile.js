import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const Profile = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    fullName: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getUser();
    }
  }, []);

  const getUser = () => {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);

    fetch("http://127.0.0.1:8080/api/v1/user", {
      method: "GET",
      headers,
    })
      .then(async (response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(await response.text());
        }
      })
      .then((data) => {
        setUserData({
          id: data.id,
          email: data.email,
          fullName: data.fullName,
        });
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`);
        localStorage.removeItem("token");
        navigate("/login");
      });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const updateHandler = () => {
    if (!userData.email.length || !userData.fullName.length) {
      setErrorMessage("All field should be filled");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    const headers = new Headers();
    headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);

    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("fullName", userData.fullName);

    fetch("http://127.0.0.1:8080/api/v1/user", {
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
      .then((message) => {
        setStatusMessage(message);
        setTimeout(() => {
          setStatusMessage("");
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        return;
      });
  };

  const deleteHandler = () => {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);

    fetch("http://127.0.0.1:8080/api/v1/user", {
      method: "DELETE",
      headers,
    })
      .then(async (response) => {
        if (response.status !== 200) {
          throw new Error(await response.text());
        }

        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        return;
      });
  };

  return (
    <>
      <Header />
      <div className="content">
        <p className="headline">Profile</p>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          alt="Profile"
        />
        <div className="userData">
          <label>User ID:</label>
          <input
            value={userData.id}
            placeholder="ID"
            disabled
            readOnly={true}
          />
        </div>
        <div className="userData">
          <label>First and Last name:</label>
          <input
            value={userData.fullName}
            onChange={(e) =>
              setUserData({ ...userData, fullName: e.target.value })
            }
            placeholder="First and Last name"
          />
        </div>
        <div className="userData">
          <label>Email:</label>
          <input
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            placeholder="Email"
          />
        </div>
        <button className="button" onClick={() => updateHandler()}>
          Save
        </button>
        <div id="error_message">{errorMessage}</div>
        <div id="status_message">{statusMessage}</div>
        <button className="button" onClick={() => logOut()}>
          Log out
        </button>
        <button id="delete" className="button" onClick={() => deleteHandler()}>
          Delete
        </button>
      </div>
    </>
  );
};

export default Profile;

import { useEffect, useState } from "react";
import "./css/MainPage.css";
import TimeLineItem from "./TimeLineItem";
import axios from "axios";
function MainPage() {
  const [patient, SetPatient] = useState({
    gender: "",
    age: 0,
    occupation: "",
    dateFrom: "",
    dateTo: "",
    desc: "",
    location: "",
    locationType: "",
  });

  const initializeState = (key) => {
    if (localStorage.getItem("timelines") === null) {
      return [];
    }

    return JSON.parse(localStorage.getItem(key));
  };

  const [tokenFromLocalStorage, setTokenFromLocalStorage] = useState({
    visitedPlace: initializeState("visitedPlaces"),
    timelines: initializeState("timelines"),
    patientInfo: initializeState("patient_info"),
  });

  const OnChangeHandler = (e) => {
    SetPatient({ ...patient, [e.target.id]: e.target.value });
  };

  const clearFields = () => {
    for (const prop in patient) {
      if (!prop.toString().includes(["age", "gender", "occupation"])) {
        document.getElementById(prop).value = "";
      }
    }
  };

  const handleSubmit = () => {
    if (localStorage.getItem("timelines")) {
      console.log("put");
      const body = patient;
      body["visitedPlaces"] = JSON.parse(localStorage.getItem("visitedPlaces"));
      body["timelines"] = JSON.parse(localStorage.getItem("timelines"));
      axios
        .put("http://localhost:3001/timeline", body)
        .then((res) => {
          console.log(res.data.visitedPlaces);
          localStorage.setItem("timelines", JSON.stringify(res.data.timelines));
          localStorage.setItem(
            "visitedPlaces",
            JSON.stringify(res.data.visitedPlaces)
          );
          setTokenFromLocalStorage({
            ...tokenFromLocalStorage,
            timelines: res.data.timelines,
            visitedPlace: res.data.visitedPlaces,
          });
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:3001/timeline", patient)
        .then((res) => {
          console.log(res.data.gender);
          localStorage.setItem("timelines", JSON.stringify(res.data.timeLines));
          localStorage.setItem(
            "patient_info",
            JSON.stringify({
              age: res.data.age,
              gender: res.data.gender,
              occupation: res.data.occupation,
            })
          );
          localStorage.setItem(
            "visitedPlaces",
            JSON.stringify(res.data.visitedPlace)
          );

          setTokenFromLocalStorage({
            timelines: res.data.timeLines,
            visitedPlace: res.data.visitedPlace,
            patientInfo: {
              age: res.data.age,
              gender: res.data.gender,
              occupation: res.data.occupation,
            },
          });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container">
      <h1>COVID Timeline Generator</h1>
      <h2>Patient Information</h2>
      <div className="container1 flex">
        <div className="item-1 item">
          <p>Gender</p>
          <select id="gender" onChange={(e) => OnChangeHandler(e)}>
            <option value="" selected disabled hidden>
              Choose here
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="item-2 item">
          <p>Age</p>
          <input id="age" onChange={(e) => OnChangeHandler(e)} />
        </div>
        <div className="item-3 item">
          <p>Occupation</p>
          <input
            value={patient.occupation}
            id="occupation"
            type="text"
            onChange={(e) => OnChangeHandler(e)}
          />
        </div>
      </div>
      <h2>Timeline</h2>
      <div className="container2 flex">
        <div className="item-1 item">
          <div className="patient-info item">
            <h6>{tokenFromLocalStorage.patientInfo.gender}</h6>
            <h3>{tokenFromLocalStorage.patientInfo.age} years old</h3>
            <h6>{tokenFromLocalStorage.patientInfo.occupation}</h6>
          </div>
          {tokenFromLocalStorage.timelines.map((item, index) => {
            return (
              <TimeLineItem
                key={index}
                dateMain={item.dateMain}
                durations={item.durations}
              />
            );
          })}
          <h2>Visited Places</h2>
          <div className="text-visited">
            {tokenFromLocalStorage.visitedPlace.map((item) => {
              return (
                <h4 style={{ color: "white", marginLeft: "5px" }}>{item}</h4>
              );
            })}
          </div>
        </div>
        <div className="item-2 item">
          <div className="item-2-1 item flex">
            <div className="item1">
              <p>From</p>
              <input
                id="dateFrom"
                onChange={(e) => OnChangeHandler(e)}
                type="datetime-local"
              />
            </div>
            <div className="item2">
              <p>To</p>
              <input
                id="dateTo"
                onChange={(e) => OnChangeHandler(e)}
                type="time"
              />
            </div>
          </div>
          <div className="item-2-2 item">
            <p>Detail</p>
            <input type="text" id="desc" onChange={(e) => OnChangeHandler(e)} />
          </div>
          <div className="item-2-3 item flex">
            <div className="item1">
              <p>Location Type</p>
              <select id="locationType" onChange={OnChangeHandler}>
                <option value="" selected disabled hidden>
                  Choose here
                </option>
                <option value="indoor">INDOOR</option>
                <option value="outdoor">OUTDOOR</option>
                <option value="home">HOME</option>
                <option value="travelling">TRAVELLING</option>
              </select>
            </div>
            <div className="item2">
              <p>Location Name</p>
              <input
                id="location"
                onChange={(e) => OnChangeHandler(e)}
                type="text"
              />
            </div>
          </div>
          <div className="item-2-4 item">
            <button className="add-btn" onClick={handleSubmit}>
              + Add Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;

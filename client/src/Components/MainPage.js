import { useEffect, useState } from "react";
import "./css/MainPage.css";
import TimeLineItem from "./TimeLineItem";
import axios from "axios";
function MainPage() {
  const [patient, SetPatient] = useState({
    gender: "male",
    age: 0,
    occupation: "",
    dateFrom: "",
    dateTo: "",
    desc: "",
    location: "",
    locationType: "indoor",
  });

  const [tokenFromLocalStorage, setTokenFromLocalStorage] = useState({
    visitedPlace: [],
    timelines: {},
  });

  useEffect(() => {
    const timelines = localStorage.getItem("timelines");
    const visitedPlaces = localStorage.getItem("visitedPlaces");
    if (tokenFromLocalStorage) {
      console.log("There you go");
    }
  }, [tokenFromLocalStorage]);

  const OnChangeHandler = (e) => {
    SetPatient({ ...patient, [e.target.id]: e.target.value });
  };

  const clearFields = () => {
    for (const prop in patient) {
      document.getElementById(prop).value = "";
    }
  };

  const handleSubmit = () => {
    if (localStorage.getItem("timelines")) {
      console.log("put");
      const body = patient;
      body["visitedPlaces"] = JSON.parse(localStorage.getItem("visitedPlaces"));
      body["timelines"] = JSON.parse(localStorage.getItem("timelines"));
      console.log(body);
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
            timelines: res.data.timelines,
            visitedPlace: res.data.visitedPlaces,
          });
        })
        .catch((err) => console.log(err));
    } else {
      console.log("post");
      axios
        .post("http://localhost:3001/timeline", patient)
        .then((res) => {
          console.log(res.data.visitedPlaces);
          localStorage.setItem("timelines", JSON.stringify(res.data.timeLines));
          localStorage.setItem(
            "visitedPlaces",
            JSON.stringify(res.data.visitedPlace)
          );
          setTokenFromLocalStorage({
            timelines: res.data.timeLines,
            visitedPlace: res.data.visitedPlace,
          });
        })
        .catch((err) => console.log(err));
    }

    // clearFields();
    console.log(patient);
  };
  return (
    <div className="container">
      <h1>COVID Timeline Generator</h1>
      <h2>Patient Information</h2>
      <div className="container1 flex">
        <div className="item-1 item">
          <p>Gender</p>
          <select id="gender" onChange={(e) => OnChangeHandler(e)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="item-2 item">
          <p>Age</p>
          <input id="age" type="text" onChange={(e) => OnChangeHandler(e)} />
        </div>
        <div className="item-3 item">
          <p>Occupation</p>
          <input
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
            <h6>Female</h6>
            <h3>32 years old</h3>
            <h6>Software Engsdfineer</h6>
          </div>
          <TimeLineItem />
          <TimeLineItem />
          <TimeLineItem />
          <TimeLineItem />

          <h2>Visited Places</h2>
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

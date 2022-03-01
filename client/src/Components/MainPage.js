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

  const OnChangeHandler = (e) => {
    SetPatient({ ...patient, [e.target.id]: e.target.value });
  };

  const [timeline, SetTimeLine] = useState({
    gender: "unknown",
    age: "unknown",
    occupation: "unknow",
    visitedPlace: [],
    timelines: [],
  });

  useEffect(() => {
    // axios
    //   .get("http://localhost:3001/timeline")
    //   .then((res) => {
    //     SetTimeLine({
    //       gender: res.data.gender,
    //       age: res.data.age,
    //       occupation: res.data.occupation,
    //       visitedPlace: res.data.visitedPlace,
    //       timelines: res.data.timeLines,
    //     });
    //   })
    //   .catch((err) => console.log(err));
    if (localStorage.getItem("timeline")) {
      const obj = JSON.parse(localStorage.getItem("timeline"));
      SetTimeLine({
        gender: obj.gender,
        age: obj.age,
        occupation: obj.occupation,
        visitedPlace: obj.visitedPlace,
        timelines: obj.timeLines,
      });
    }
  }, []);

  const handleSubmit = () => {
    if (localStorage.getItem("timeline")) {
      console.log("put");
      axios
        .put("http://localhost:3001/timeline", patient)
        .then((res) => {
          localStorage.setItem("timeline", JSON.stringify(res.data));
          SetTimeLine({
            gender: res.data.gender,
            age: res.data.age,
            occupation: res.data.occupation,
            visitedPlace: res.data.visitedPlace,
            timelines: res.data.timeLines,
          });
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:3001/timeline", patient)
        .then((res) => {
          console.log(res.data.gender);
          localStorage.setItem("timeline", JSON.stringify(res.data));
          SetTimeLine({
            gender: res.data.gender,
            age: res.data.age,
            occupation: res.data.occupation,
            visitedPlace: res.data.visitedPlace,
            timelines: res.data.timeLines,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = (dateToDelete, dateFromDelete, dateMain, location) => {
    const body = {
      dateToDelete: dateToDelete,
      dateFromDelete: dateFromDelete,
      dateMain: dateMain,
      location: location,
    };
    axios
      .delete("http://localhost:3001/timeline/duration", body)
      .then((res) => {
        localStorage.setItem("timeline", JSON.stringify(res.data));
        SetTimeLine({
          gender: res.data.gender,
          age: res.data.age,
          occupation: res.data.occupation,
          visitedPlace: res.data.visitedPlace,
          timelines: res.data.timeLines,
        });
      })
      .catch((err) => console.log(err));
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
            <h6>{timeline.gender}</h6>
            <h3>{timeline.age} years old</h3>
            <h6>{timeline.occupation}</h6>
          </div>
          {timeline.timelines.map((item, index) => {
            return (
              <TimeLineItem
                key={index}
                dateMain={item.dateMain}
                durations={item.durations}
                updateParent={SetTimeLine}
              />
            );
          })}
          <h2>Visited Places</h2>
          <div className="text-visited">
            {timeline.visitedPlace.map((item) => {
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

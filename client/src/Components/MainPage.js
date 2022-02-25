import { useState } from "react";
import "./css/MainPage.css";
import TimeLineItem from "./TimeLineItem";
function MainPage() {
  const [patient, SetPatient] = useState({
    gender: "male",
    age: 0,
    occupation: "",
    dateTime: "",
    to: "",
    desc: "",
    location: "",
  });

  const OnChangeHandler = (e) => {
    SetPatient({ ...patient, [e.target.id]: e.target.value });
  };

  const clearFields = () => {
    for (const prop in patient) {
      document.getElementById(prop).value = "";
    }
  };

  const handleSubmit = () => {
    clearFields();
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
        {/* End item1 */}
        <div className="item-2 item">
          <div className="item-2-1 item flex">
            <div className="item1">
              <p>From</p>
              <input
                id="dateTime"
                onChange={(e) => OnChangeHandler(e)}
                type="datetime-local"
              />
            </div>
            <div className="item2">
              <p>To</p>
              <input id="to" onChange={(e) => OnChangeHandler(e)} type="time" />
            </div>
          </div>
          <div className="item-2-2 item">
            <p>Detail</p>
            <input type="text" id="desc" onChange={(e) => OnChangeHandler(e)} />
          </div>
          <div className="item-2-3 item flex">
            <div className="item1">
              <p>Location Type</p>
              <select>
                <option>INDOOR</option>
                <option>OUTDOOR</option>
                <option>HOME</option>
                <option>TRAVELLING</option>
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

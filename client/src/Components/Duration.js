import "./css/TimeLineItem.css";
import DetailItem from "./DetailItem";
import { useState } from "react";
import axios from "axios";
function Duration(props) {
  function convertTZ(date) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: "Asia/Jakarta" }
      )
    );
  }
  const [displayDuration, setDisplayDuration] = useState(true);

  const divStyle = {
    display: displayDuration ? "block" : "none",
  };
  const handleDisplay = () => {
    setDisplayDuration(!displayDuration);
  };

  //   console.log(convertTZ(date, "Asia/Jakarta")) // current date-time in jakarta.
  return (
    <div className="detail-div" style={divStyle}>
      <div className="item-2-detail" onClick={handleDisplay}>
        x
      </div>
      <span className="time-item" style={{ color: "#ffc107" }}>{`${convertTZ(
        new Date(props.dateFrom)
      )
        .toTimeString()
        .split(" ")[0]
        .slice(0, 5)} - ${convertTZ(new Date(props.dateTo))
        .toTimeString()
        .split(" ")[0]
        .slice(0, 5)}`}</span>
      <div className="detail-flex">
        {props.details.map((item, index) => {
          return (
            <DetailItem
              key={index}
              desc={item.desc}
              location={item.location}
              locationType={item.locationType}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Duration;

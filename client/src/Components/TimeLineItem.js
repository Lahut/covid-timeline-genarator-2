import Timeline from "@mui/lab/Timeline";
import Duration from "./Duration";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import "./css/TimeLineItem.css";

function TimeLineItem(props) {
  return (
    <Timeline position="right">
      <div className="timeline-main">
        <TimelineItem>
          <TimelineOppositeContent>
            <span className="font-link" style={{ color: "#ffc107" }}>
              {new Date(props.dateMain).toLocaleDateString()}
            </span>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot style={{ backgroundColor: "#ffc107" }} />
            <TimelineConnector />
          </TimelineSeparator>
          <div className="timeline-main">
            <div className="timeline-detail">
              <TimelineContent>
                <div className="detail-item font-link">
                  {props.durations.map((item, index) => (
                    <Duration
                      key={index}
                      dateFrom={item.dateFrom}
                      dateTo={item.dateTo}
                      details={item.details}
                      dateMain={props.dateMain}
                    />
                  ))}
                </div>
              </TimelineContent>
            </div>
          </div>
        </TimelineItem>
      </div>
    </Timeline>
  );
}
export default TimeLineItem;

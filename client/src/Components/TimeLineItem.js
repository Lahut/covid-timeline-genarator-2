import Timeline from "@mui/lab/Timeline";
import DetailItem from "./DetailItem";
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
              22/22/22
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
                  <span className="time-item ">16:00-23:00</span>
                  <div className="detail-flex">
                    <DetailItem />
                    <DetailItem />
                  </div>
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

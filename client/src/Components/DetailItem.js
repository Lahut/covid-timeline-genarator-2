import "./css/DetailItem.css";

function DetailItem(props) {
  return (
    <div className="container-detail">
      <div className="item-1-detail">
        <p>{props.desc}</p>
        <p
          style={{ color: "#5882E3" }}
        >{`${props.locationType} - ${props.location}`}</p>
      </div>
    </div>
  );
}

export default DetailItem;

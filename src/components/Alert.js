import { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "12px",
      margin: "10px 0",
      padding: "10px",
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "rgb(0, 0, 255)";
    this.bgColor = "rgb(220, 220, 255)";
  }
}
class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "rgb(188, 161, 4)";
    this.bgColor = "rgb(252, 242, 185)";
  }
}
class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "rgb(191, 36, 3)";
    this.bgColor = "rgb(251, 156, 136)";
  }
}

export { InfoAlert, ErrorAlert, WarningAlert };

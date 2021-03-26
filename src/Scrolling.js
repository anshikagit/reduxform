import React from "react";
import ReactDOM from "react-dom";
// import axios from "axios";
import response from "./db.json";

// import "./styles.css";

export default class Scrolling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseData: response.slice(0, 10),
      index: 10
    };
    this.loadRef = React.createRef();
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(entries => {
      const { index } = this.state;
      console.log(entries, "entries")
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          console.log(index, "index");
          this.setState({
            responseData: response.slice(0, index + 10),
            index: index + 10
          });
        }
      });
    });
    this.observer.observe(this.loadRef.current);
  }

  

  render() {
    const { responseData } = this.state;
    console.log(responseData);
    return (
      <div className="App">
        <h1>Welcome to the Internet</h1>
       
        {responseData.map(item => (
          <div>
            <p>{item.title}</p>
           <p>{item.userId}</p>
           <p>{item.body}</p>
          </div>
        ))}
        <p id="load" ref={this.loadRef} />
      </div>
    );
  }
}


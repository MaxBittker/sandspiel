import React from "react";
import { runBenchmark } from "../benchmark";

class BenchmarkRunner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lines: ["TESTING:"], show: true };
  }
  componentDidMount() {
    this.run();
  }
  run() {
    runBenchmark((newline) =>
      this.setState(({ lines }) => {
        return {
          lines: [...lines, newline],
        };
      })
    );
  }

  render() {
    let { lines, show } = this.state;

    if (!show) {
      return null;
    }
    return (
      <div className="benchmark">
        <pre>{lines.join("\n")}</pre>
        <span>
          <button
            onClick={() => {
              this.run();
            }}
          >
            {" "}
            re-run
          </button>
          {"    "}
          <button onClick={() => this.setState({ show: false })}> close</button>
        </span>
      </div>
    );
  }
}
export default BenchmarkRunner;

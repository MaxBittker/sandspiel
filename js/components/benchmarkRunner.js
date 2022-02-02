import React from "react";
import { runBenchmark } from "../benchmark";

class BenchmarkRunner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lines: ["TESTING:"] };
  }
  componentDidMount() {
    runBenchmark((newline) =>
      this.setState(({ lines }) => {
        return {
          lines: [...lines, newline],
        };
      })
    );
  }

  render() {
    let { lines } = this.state;

    return <pre className="benchmark">{lines.join("\n")}</pre>;
  }
}
export default BenchmarkRunner;

import React from "react";
import { Link } from "react-router-dom";

const HyperText = ({ text }) => {
  let tokens = text.split(" ");

  let nodes = tokens.map((t, i) => {
    if (t.startsWith("#") && t.length > 1) {
      return (
        <React.Fragment key={i}>
          <Link
            to={{
              pathname: "/browse/search/",
              search: `?title=${t.slice(1)}`,
            }}
          >
            {t}
          </Link>{" "}
        </React.Fragment>
      );
    }
    if (t.startsWith("https://sandspiel.club/browse/search/?user=")) {
      return (
        <React.Fragment key={i}>
          <Link
            to={{
              pathname: "/browse/search/",
              search: t.slice("https://sandspiel.club/browse/search/".length),
            }}
          >
            [profile]
          </Link>{" "}
        </React.Fragment>
      );
    } else {
      return t + " ";
    }
  });
  return <React.Fragment>{nodes}</React.Fragment>;
};
export default HyperText;

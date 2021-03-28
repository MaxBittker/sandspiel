import React, { useState } from "react";
import { Link } from "react-router-dom";
import HyperText from "./hypertext.js";
import classnames from "classnames";
import { ago, storageUrl } from "./browse";
import { functions, storage } from "../api.js";

export function Post({ submission, voteFromBrowse, browseVotes, report }) {
  let [nextPost, setNextPost] = useState(null);
  let displayTime = new Date(submission.data.timestamp).toLocaleDateString();
  let msAgo =
    new Date().getTime() - new Date(submission.data.timestamp).getTime();

  if (msAgo < 24 * 60 * 60 * 1000) {
    displayTime = ago.format(submission.data.timestamp);
  }

  function fetchParent() {
    fetch(
      functions._url(`api/creations/${submission.data.parent_id.slice(0, 20)}`),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setNextPost({ id: data.id, data });
      });
  }
  const hasParent = submission.data?.parent_id;
  return (
    <div className="thread">
      {nextPost && (
        <Post
          submission={nextPost}
          voteFromBrowse={voteFromBrowse}
          browseVotes={browseVotes}
          report={report}
        />
      )}
      <div
        key={submission.id}
        className={classnames("submission", { expanded: nextPost })}
      >
        <Link
          className="img-link"
          to={{
            pathname: "/",
            hash: `#${submission.id}`,
          }}
          onClick={() => {
            window.UI.setState(
              () => ({
                currentSubmission: null,
              })
              // window.UI.load
            );
          }}
        >
          <img src={`${storageUrl}${submission.data.id}.png?alt=media`} />
        </Link>
        <div style={{ width: "50%" }}>
          {hasParent && (
            <button
              className={classnames("parent", { active: nextPost })}
              onClick={fetchParent}
            >
              ↑
            </button>
          )}

          <h3
            style={{
              flexGrow: 1,
              wordWrap: "break-word",
              marginRight: hasParent ? 35 : 0,
            }}
          >
            <HyperText text={submission.data.title} />
          </h3>
          <button className="heart" onClick={() => voteFromBrowse(submission)}>
            {browseVotes[submission.id] ? "🖤" : "♡"}
            {browseVotes[submission.id] || submission.data.score}
          </button>

          <h4>{displayTime}</h4>

          <button
            className="report"
            title="report"
            onClick={() => report(submission.id)}
          >
            !
          </button>
        </div>
      </div>
    </div>
  );
}

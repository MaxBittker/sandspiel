import React from "react";

const Info = () => {
  return (
    <div className="Info">
      <h1>sandspiel </h1>
      <p>
        Created by <a href="https://maxbittker.com">max bittker</a>
      </p>
      <p>
        Welcome, and thanks for coming by! I hope that you enjoy exploring this
        small game, and it brings you some calm.{" "}
      </p>
      <p>
        Growing up, "falling sand" games like this one provided me hours of
        entertainment and imagination. I want to particularly thank ha55ii's{" "}
        <a href="https://dan-ball.jp/en/javagame/dust/">Powder Game</a> as the
        primary inspiration for sandspiel.
      </p>
      <br />
      <p>
        You can follow sandspiel on twitter for updates and new uploads:
        <a href="https://twitter.com/sandspiel_feed">@sandspiel_feed</a>
      </p>
      <br />
      <p>
        If you'd like, you can view the{" "}
        <a href="https://github.com/maxbittker/sandspiel">source code</a> or{" "}
        <a href="https://github.com/maxbittker/sandspiel/issues">report bugs</a>{" "}
        on github
      </p>
      <h2>FAQs</h2>
      <p>(TODO: write some FAQs)</p>
      If you have any other questions, feel free to reach out on twitter and
      I'll try to answer!
      <h2>Element Information:</h2>
      <h4>Wall </h4>
      Indestructible
      <h4>Sand </h4>
      Sinks in water
      <h4>Water </h4>
      Puts out fire
      <h4>Stone </h4>
      Forms arches, folds under pressure
      <h4>Ice </h4>
      Freezes Water, slippery!
      <h4>Gas </h4>
      Highly Flammable!
      <h4>Cloner </h4>
      Copies the first element it touches
      <h4>Mite </h4>
      Eats wood and plant, but loves dust! Slides on ice
      <h4>Wood </h4>
      Sturdy, but biodegradable
      <h4>Plant </h4>
      Thrives in wet enviroments
      <h4>Fungus </h4>
      Spreads over everything
      <h4>Seed </h4>
      Grows in sand
      <h4>Fire </h4>
      Hot!
      <h4>Lava </h4>
      Flammable and heavy
      <h4>Acid </h4>
      Corrodes other elements
      <h4>Dust </h4>
      Pretty, but dangerously explosive
      <h4>Oil </h4>
      Produces smoke
      <h4>Firework </h4>
      Explodes into copies of the first element it touches
    </div>
  );
};

export default Info;

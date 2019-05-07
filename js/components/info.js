import React from "react";

const Info = () => {
  return (
    <div className="Info">
      <h1>Sandspiel </h1>
      <p>
        Created by <a href="https://maxbittker.com">max bittker</a>
      </p>
      <hr />
      <br />
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
        If you want to read more the inspiration, architecture, and history of
        the game, I wrote a blog post (it gets technical in the middle):&nbsp;
        <a href="https://maxbittker.com/making-sandspiel">Making Sandspiel</a>
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
        on github or feel free to reach out on twitter and I'll try to answer!
      </p>
      <br />
      <p>
        Lastly, I want to say that if you enjoy this game or share your artwork
        on it, your opinion is important to me and I want to do my best to
        ensure sandspiel is a friendly and kind place to play, without bullying,
        racism, or homophobia. If something is wrong or there's some way I can
        help, feel free to contact me at [FirstnameLastname]@gmail.com
      </p>
      <br />
      <hr />
      <br />
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
      <h4>Rocket </h4>
      Explodes into copies of the first element it touches
      <hr />
      <hr />
      <hr />
      <hr />
    </div>
  );
};

export default Info;

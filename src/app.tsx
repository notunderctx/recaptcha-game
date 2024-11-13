import { h } from "preact";
import { Router, Route } from "preact-router";
import MainCover from "./Components/Cover";
import ReChallenge from "./rechallenge";

export function App() {
  return (
    <div className="h-screen w-screen">
      <Router>
        <Route path="/" component={MainCover} />
        <Route path="/rechallenge" component={ReChallenge} />
      </Router>
    </div>
  );
}

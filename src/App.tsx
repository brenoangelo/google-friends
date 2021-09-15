import { BrowserRouter, Route, Router } from "react-router-dom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={ Home } />
        <Route path="/rooms/new" exact component={ NewRoom } />
      </BrowserRouter>
    </div>
  );
}
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Room } from "./pages/Room";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProvider } from './contexts/AuthContext';

import * as ROUTES from "./routes/Routes"

export function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
            <Switch>
              <Route path={ROUTES.HOME} exact component={Home} />
              <Route path={ROUTES.NEWROOM} component={NewRoom} />
              <Route path={ROUTES.ROOM} component={Room} /> 
            </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}
import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageHome from "./routes/PageHome";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <PageHome />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

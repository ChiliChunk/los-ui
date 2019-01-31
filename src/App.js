import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


import Unsubscribe from "./components/Unsubscribe";
import Signin from "./components/Signin";
import Home from "./components/home"
import Signup from "./components/Signup";
import "./style/App.css";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return rest.isConnected ? (
        <Component {...props} />
      ) : (
          <Redirect to="/signin" />
        );
    }}
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      isConnected: false
    };

    this.setSessionToken = this.setSessionToken.bind(this);
  }

  setSessionToken(token) {
    this.setState({ token, isConnected: true });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/signin"
            render={props => (
              <Signin setSessionToken={this.setSessionToken} {...props} />
            )}
          />
          />
          <Route path="/signup" component={Signup} />

          <PrivateRoute path="/unsubscribe" component={Unsubscribe} isConnected={this.state.isConnected}/>
          <PrivateRoute component={Home} isConnected={this.state.isConnected} />

        </Switch>
      </Router>
    );
  }
}

export default App;

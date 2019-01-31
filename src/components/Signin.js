import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as userActions from '../actions/userActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';
import '../style/signin.css'
import Button from '@material-ui/core/Button';


import { SERVER_URL } from "../consts";

import "../style/App.css";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .get(
        SERVER_URL +
          "/users/connect?email=" +
          this.state.email +
          "&password=" +
          this.state.password
      )
      .then(res => {
        if (res.data.status === "ok") {
          this.props.setSessionToken(res.data.token);
          this.props.history.push(process.env.PUBLIC_URL + "/");
          this.props.userActions.setUserData(res.data)
        }
      });
  }
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className="testContainer">
      <Paper elevation={2} className="formbox">
      <img className="imgSignin" src={process.env.PUBLIC_URL + 'lol.png'} />
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              <TextField
                id="outlined-with-placeholder"
                label="Login"
                placeholder="Login"
                margin="normal"
                variant="outlined"
                value={this.state.email}
                onChange={this.handleChangeEmail}
              />
            </label>
          </div>
          <div>
            <label>
              <TextField
                id="outlined-with-placeholder"
                label="Mot de passe"
                placeholder="Mot de passe"
                margin="normal"
                type="password"
                variant="outlined"             
                value={this.state.password}
                onChange={this.handleChangePassword}
              />
            </label>
          </div>
          <Button variant="outlined" onClick={(e) => this.handleSubmit(e)}>
            Se connecter
          </Button>
          <Button variant="outlined" secondary onClick={() => {this.props.history.push(process.env.PUBLIC_URL + "/signup");}}>
              Créer un compte
            </Button>
        </form>
      </div>
      </Paper>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    userReducer: state.userReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Signin)
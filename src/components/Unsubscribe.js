import React, { Component } from "react";
import axios from "axios";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../actions/userActions'

import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';
import '../style/signin.css'
import Button from '@material-ui/core/Button';

import { SERVER_URL } from "../consts";

import "../style/App.css";


class Unsubscribe extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
              "/users/unsubscribe?email=" +
              this.props.user.userData.data.email +
              "&password=" +
              this.state.password +
              "&token=" +
              this.props.user.userData.data.token
          )
          .then(res => {
            if (res.data.status === "ok") {
              axios
              .get(SERVER_URL + "/users/disconnect?token=" +
              this.props.user.userData.data.token)
              .then(res => { if (res.data.status === "ok") { 
                alert("Compte supprimé"); 
                this.props.history.replace("/signin")
              } })

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
          <div className = "testContainer">
            <Paper elevation={2} className="formbox">
            <form onSubmit={this.handleSubmit}>
              <div>
                  <TextField
                id="outlined-with-placeholder"
                label="Mot de passe"
                placeholder="Mot de passe"
                type="password"
                margin="normal"
                variant="outlined"
                value={this.state.password}
                onChange={this.handleChangePassword}
              />
              </div>
              <div>
              <Button variant="outlined" onClick={(e) => this.handleSubmit(e)}>
                Supprimer son compte
              </Button>
              </div>
            </form>
            </Paper>
          </div>
        );
    }
}

function mapStateToProps (state) {
    return {
      user: state.userReducer
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      userActions: bindActionCreators(userActions, dispatch),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Unsubscribe)


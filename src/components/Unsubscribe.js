import React, { Component } from "react";
import axios from "axios";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../actions/userActions'

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
          })
          .catch(function (error) {
            console.log(error);
          });
          ;
      }
      handleChangeEmail(e) {
        this.setState({ email: e.target.value });
      }
      handleChangePassword(e) {
        this.setState({ password: e.target.value });
      }

    render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              Entrer votre mot de passe :
              <div>
                <label>
                  Mot de passe :{" "}
                  <input
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                  />
                </label>
              </div>
              <div>
                <input type="submit" value="Supprimer son compte" />
              </div>
            </form>
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


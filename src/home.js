import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import logo from "./logo.svg";
import MatchakingTab from "./components/MatchakingTab"
import "./App.css";
import axios from "axios";
import { SERVER_URL } from "./consts";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from './actions/userActions'

class Home extends Component {
    constructor(props){
        super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault();
        axios
          .get( 
            SERVER_URL +
              "/matchmaking/getAll"
          )
          .then(res => {
              console.log(res)
              //traiter le json et remplir le tableau
          });
      }
    render() {
        console.log(this.props)
        let players = ['Joueur1', 'GrosNoob', 'Joueur3']

        return (

            <div>
                <MatchakingTab players={players} refs="TableauJoueurs"/>
                <Button variant="contained" color="secondary">
                    Deconnexion
                </Button>
                <Button variant="contained" color="secondary" onClick={this.handleSubmit}>
                    Prêt
                </Button>
            </div >
        )
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
  export default connect(mapStateToProps, mapDispatchToProps)(Home)
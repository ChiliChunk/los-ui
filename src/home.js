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
        this.state = {
            i : [],
            matchmakingIds : []
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        axios
          .get( 
            SERVER_URL +
              "/matchmaking/participate?token="+this.props.userReducer.userData.data.token
          )
          .then(res => {
            console.log(res)

            //traiter le json et remplir le tableau
        });
        axios
          .get( 
            SERVER_URL +
              "/matchmaking/getAll?token="+this.props.userReducer.userData.data.token
          )

          .then(res => {
              let a
              let i = []
              let tab = []
              for (a in res.data.data){
                  console.log(res.data.data[a].name)
                  i[a]=res.data.data[a].name
                  tab[a]=res.data.data[a].matchmakingId
                  console.log(res.data.data[a].matchmakingId)
              }
              tab=res.data.data
              console.log(res)
              console.log(i)
              this.setState({i : i})
              this.setState({matchmakingIds : tab})
          });
          
      }
    render() {
        console.log(this.props.userReducer.userData)
        let players = ['Joueur1', 'GrosNoob', 'Joueur3']

        return (

            <div>
                <MatchakingTab players={this.state.i} id={this.state.matchmakingIds} refs="TableauJoueurs"/>
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
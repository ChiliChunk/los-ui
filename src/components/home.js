import React, { Component } from "react";
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom'
import MatchakingTab from "../components/MatchakingTab"
import axios from "axios";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../actions/userActions'

import { SERVER_URL } from "../consts";
import "../style/home.css"

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isReady: false
        }
    }

    switchReady() {
        this.setState({ isReady: !this.state.isReady })
    }

    getAllPlayersReady() {
        return ['Joueur1', 'GrosNoob', 'Joueur3']
    }

    handleDisco(){
        console.log(SERVER_URL + "/users/disconnect?token=" +
        this.props.user.userData.data.token)
        axios
        .get(SERVER_URL + "/users/disconnect?token=" +
                this.props.user.userData.data.token)
            .then(res => {console.log(res); if(res.data.status === "ok") {
                alert("Vous étes deconnecté")
                this.props.history.replace("/signin")
            } })
    }

    render() {
        //To change we don't want to search all players even when not ready
        let players = this.getAllPlayersReady()
        let textButton = this.state.isReady ? "Annuler" : "Prêt"
        //To change we need to change the color with the CSS instead
        let colorButton = this.state.isReady ? "secondary" : "primary"
        const MyLink = props => <Link to="/unsubscribe" {...props} />

        return (
            <div className="home">
                <div className="header">
                    <Button className="buttonDisconnect" variant="contained" color="default" onClick={()=>this.handleDisco()}>
                        Deconnexion
                    </Button>

                    <Button className="buttonDeleteAccount" variant="contained" color="default" component={MyLink}>
                        Supprimer le compte
                    </Button>
                </div>

                <div className="matchmaking">
                    {this.state.isReady ? <MatchakingTab players={players} /> : null}

                    <Button className="buttonReady" variant="contained" onClick={this.switchReady.bind(this)} ready={this.state.isReady}>
                        {textButton}
                    </Button>


                </div>

                <div className="createDeck">
                    <Button variant="contained" >
                        Modifier Deck
                    </Button>
                </div>
            </div>
        )
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)

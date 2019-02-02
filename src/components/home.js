import React, { Component } from "react";
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom'
import axios from "axios";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../actions/userActions'
import { SERVER_URL } from "../consts";
import "../style/home.css"
import MatchakingTab from './MatchakingTab'
import Game from './Game'
import DeckMaker from "./DeckMaker";

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isReady: false,
            requests : [],
            matchFound : false,
            showDeckMaker : false
        }
    }


    async storeMatchData(match , isJoueur1){
        this.props.history.push(process.env.PUBLIC_URL + "/game")
    }
    participate(){
        console.log('call to participate')
        console.log(this.state)
        if (this.props.userReducer.userData.data){
            axios
                .get( 
                SERVER_URL +
                    "/matchmaking/participate?token="+this.props.userReducer.userData.data.token
                )
                .then(res => {
                this.setState({
                    requests : res.data.data.request,
                })
                if(res.data.data.match !== undefined && res.data.data.match !== null){ //connected player send the request
                   this.storeMatchData(res.data.data.match , true)
                }
            });
        }
    }

    componentWillUnmount(){
        console.log('UNMOUNT')
    }

    switchReady() {
        this.setState({ isReady: !this.state.isReady })           
        
        axios
            .get( 
            SERVER_URL +
                "/matchmaking/participate?token="+this.props.userReducer.userData.data.token
            )
            .then(res => {
            this.setState({
                requests : res.data.data.request,
            })
            if(res.data.data.match !== undefined && res.data.data.match !== null){ //connected player send the request
               this.storeMatchData(res.data.data.match)
            }
        });
        axios
            .get( 
            SERVER_URL +
                "/matchmaking/getAll?token="+this.props.userReducer.userData.data.token
            )

            .then(res => {
                let a
                let allReadyPlayers = []
                let tab = []
                for (a in res.data.data){
                    allReadyPlayers[a]=res.data.data[a].name
                    tab[a]=res.data.data[a].matchmakingId
                }
                tab=res.data.data
                this.setState({allReadyPlayers : allReadyPlayers,
                    matchmakingIds : tab })
            });
              
    }

    handleDisco() {
        axios
            .get(SERVER_URL + "/users/disconnect?token=" +
                this.props.user.userData.data.token)
            .then(res => {
                console.log(res); if (res.data.status === "ok") {
                    alert("Vous étes deconnecté")
                    this.props.history.replace("/signin")
                }
            })
    }

    closeDeckMaker(){
        console.log("close deck")
        this.setState({showDeckMaker : false})
    }

    render() {
        if (this.state.showDeckMaker){
            return (
                <DeckMaker
                closeDeckMaker = {this.closeDeckMaker.bind(this)}/>
            )
        }
        if (this.state.matchFound){
            return(
                <Game />
            )
        }
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
                <h3>Bienvenue {this.props.userReducer.userData.data && this.props.userReducer.userData.data.name}</h3>
                <div className="matchmaking">
                    {this.state.isReady ? <MatchakingTab
                                            type = "availablePlayers"
                                            key={1}
                                            players={this.state.allReadyPlayers}
                                            matchmakingIds = {this.state.matchmakingIds}
                                            title = "Joueurs a défier"/> : null}
                    
                    {this.state.isReady ? <MatchakingTab
                                            key={2}
                                            type = "challengeRequests"
                                            players={(this.state.requests || [])}
                                            storeMatchData = {this.storeMatchData}
                                            matchmakingIds = {this.state.matchmakingIds}
                                            title = "Joueurs voulant vous defier"/> : null}
                    
                    <Button className="buttonReady" variant="contained" disabled={this.props.userReducer && this.props.userReducer.deck.length === 0 ? true : false} onClick={this.switchReady.bind(this)}>
                        {textButton}
                    </Button>
                    <br/>



                </div>

                <div className="createDeck">
                    <Button variant="contained" onClick={() =>{this.setState({showDeckMaker : true})}}>
                        Créer Deck
                    </Button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      userReducer: state.userReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

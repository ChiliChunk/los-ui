import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import logo from "./logo.svg";
import MatchakingTab from "./components/MatchakingTab"
import "./style/home.css"

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

    render() {
        //To change we don't want to search all players even when not ready
        let players = this.getAllPlayersReady()
        let textButton = this.state.isReady ? "Annuler" : "Prêt"
        //To change we need to change the color with the CSS instead
        let colorButton = this.state.isReady ? "secondary" : "primary"

        return (
            <div className="home">
                <div className="header">
                    <Button className="buttonDisconnect" variant="contained" color="default">
                        Deconnexion
                    </Button>

                    <Button className="buttonDeleteAccount" variant="contained" color="default">
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
export default Home;
import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import logo from "./logo.svg";
import MatchakingTab from "./components/MatchakingTab"
import "./App.css";
import DeckMaker from "./components/DeckMaker"
class Home extends Component {
    render() {
        return <DeckMaker />

        /*
        let players = ['Joueur1', 'GrosNoob', 'Joueur3']

        return (

            <div>
                <MatchakingTab players={players} />
                <Button variant="contained" color="secondary">
                    Deconnexion
                </Button>
            </div >
        )
        */}
}
export default Home;
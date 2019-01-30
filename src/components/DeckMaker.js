import React from 'react'
import '../style/deckMaker.css'
import PlayingCard from './PlayingCard'


import * as userActions from '../actions/userActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import Button from '@material-ui/core/Button';

const champions = require('./champion.json')
class DeckMaker extends React.Component {
    constructor(props) {
        super(props)
        this.addCard = this.addCard.bind(this)

        let championsNotSelected = champions
        this.state = {
            championsNotSelected: championsNotSelected,
            championsSelected: []
        }

    }

    addCard(index) {
        if (this.state.championsSelected.length !== 20) {
            let champion = this.state.championsNotSelected.splice(index, 1)[0]
            let temp = this.state.championsSelected
            temp.push(champion)
            this.setState({ championsSelected: temp })
        }
    }

    createDeck() {

    }

    async componentDidMount() {
        const championsData = await this.fetchCardData()
        this.setState({ championsData: championsData })
    }


    async fetchCardData() {
        let response = await axios.get('http://localhost:3001/cards/getAll')
        return response.data.data
    }

    sendDeck() {
        let devDeck = ["Jax", "Ivern", "Lux"] // change this variable devDeck by the real deck
        let objectUrl = []
        let requestUrl = 'http://localhost:3001/match/initDeck?deck='
        devDeck.map(champions => {
            objectUrl.push({ key: champions })
        })
        requestUrl += JSON.stringify(objectUrl)
        requestUrl += "&token=" + this.props.userReducer.userData.data.token
        console.log(requestUrl)
        axios.get(requestUrl).then((response) => {
            console.log(response)
        })
    }
    render() {
        return (
            <div className="deckMaker">
                <div className="cardsPacked">
                    <h2 className="title"> Toutes les cartes</h2>
                    {(this.state.championsNotSelected || []).map((champions, index) => {
                        return (
                            <span key={index} onClick={() => this.addCard(index)}><PlayingCard name={champions.name} attack={champions.info.attack} armor={champions.info.defense} keyChamp={champions.key} /></span>
                        )
                    })}
                </div>

                <div className="cardsPacked">
                    <h2 className="title"> Mon deck</h2>
                    {(this.state.championsSelected || []).map((champions, index) => {
                        return (
                            <span key={index}> <PlayingCard name={champions.name} attack={champions.info.attack} armor={champions.info.defense} keyChamp={champions.key} /></span>
                        )
                    })}



                </div>
                <Button variant="contained" className="buttonValidate" onClick={() => this.createDeck()} disabled={this.state.championsSelected.length === 20 ? false : true} >
                    Valider
                </Button>
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


export default connect(mapStateToProps, mapDispatchToProps)(DeckMaker)


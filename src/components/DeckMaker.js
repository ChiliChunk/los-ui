import React from 'react'
import '../style/deckMaker.css'
import PlayingCard from './PlayingCard'


import * as userActions from '../actions/userActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { SERVER_URL } from "../consts";


class DeckMaker extends React.Component {
    constructor(props) {
        super(props)
        this.addCard = this.addCard.bind(this)
        let championsNotSelected = this.fetchCardData()
        this.state = {
            championsNotSelected: championsNotSelected,
            championsSelected: []
        }
    }

    async fetchCardData() {
        let response = await axios.get(SERVER_URL + '/cards/getAll')
        return response.data.data
    }

    addCard(index) {
        if (this.state.championsSelected.length !== 20) {
            let champion = this.state.championsNotSelected.splice(index, 1)[0]
            let temp = this.state.championsSelected
            temp.push(champion)
            this.setState({ championsSelected: temp })
        }
    }


    async componentDidMount() {
        const championsData = await this.fetchCardData()
        this.setState({ championsData: championsData })
    }



    sendDeck() {
        let devDeck = []
        {
            (this.state.championsSelected || []).map((champions, index) => {
                devDeck.push(champions.keyChamp)
            })
        }
        let objectUrl = []
        let requestUrl = SERVER_URL + '/match/initDeck?deck='
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
                <Button variant="contained" className="buttonValidate" onClick={() => this.sendDeck()} disabled={this.state.championsSelected.length === 20 ? false : true} >
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
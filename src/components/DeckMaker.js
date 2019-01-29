import React from 'react'
import '../style/deckMaker.css'
import PlayingCard from './PlayingCard'


import * as userActions from '../actions/userActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
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
        console.log(index)
        let champion = this.state.championsNotSelected.splice(index)
        console.log(champion)
        this.state.championsSelected.push(champion)
    }

    async componentDidMount() {
        const championsData = await this.fetchCardData()
        this.setState({ championsData: championsData })
    }

    async fetchCardData() {
        let response = await axios.get('http://ling.westeurope.cloudapp.azure.com/cards/getAll')
        return response.data.data
    }

    render() {
        console.log(this.state)
        return (
            <div className="deckMaker">
                <div className="cardsPacked">
                    <h2> Toutes les cartes</h2>
                    {(this.state.championsNotSelected || []).map((champions, index) => {
                        return (
                            <span key={index} onClick={() => this.addCard(index)}><PlayingCard name={champions.name} attack={champions.info.attack} armor={champions.info.defense} /></span>
                        )
                    })}
                </div>

                <div className="cardsPacked">
                    <h2>Mon deck</h2>
                    {(this.state.championsSelected || []).map((champions, index) => {
                        return (<a></a>
                            //<PlayingCard key={index} name={champions.name} attack={champions.info.attack} armor={champions.info.defense} />
                        )
                    })}
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


export default connect(mapStateToProps, mapDispatchToProps)(DeckMaker)


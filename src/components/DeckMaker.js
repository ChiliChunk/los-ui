import React from 'react'
import '../style/deckMaker.css'
import * as userActions from '../actions/userActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
const champions = require('./champion.json')
class DeckMaker extends React.Component{
    constructor(props){
        super(props)
        
        let championsNotSelected = champions
        this.state = {
            championsNotSelected : championsNotSelected,
            championsSelected : []
        }
    }
    async componentDidMount(){
        const championsData = await this.fetchCardData()
        this.setState({championsData : championsData})
    }

    async fetchCardData(){
        let response = await axios.get('http://ling.westeurope.cloudapp.azure.com/cards/getAll')
        return response.data.data
    }

    sendDeck(){
        let devDeck = ["Jax" , "Ivern" , "Lux"] // change this variable devDeck by the real deck
        let objectUrl = []
        let requestUrl  = 'http://ling.westeurope.cloudapp.azure.com/match/initDeck?deck='
        devDeck.map(champions=>{
            objectUrl.push({key:champions})
        })
        requestUrl += JSON.stringify(objectUrl)
        requestUrl += "&token="+this.props.userReducer.userData.data.token
        console.log(requestUrl)
        axios.get(requestUrl)
    }
    render(){
        return(
            <span className="deckMaker">
                <div className="cardsPacked">
                    {(this.state.championsNotSelected || []).map((champions,index) =>{
                        return(
                            <h3>test</h3>
                        )
                    })}
                </div>
                <div className="cardsPacked">
                    <h3 onClick={()=>{this.sendDeck()}}>Test</h3>
                </div>
            </span>
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


export default connect(mapStateToProps, mapDispatchToProps)(DeckMaker)


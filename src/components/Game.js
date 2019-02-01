import React, { Component } from "react";

import Character from './Character'
import Hand from './Hand'
import Board from './Board'
import '../style/game.css'
import axios from 'axios'
import { SERVER_URL } from "../consts";
import * as userActions from '../actions/userActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PlayingCard from "./PlayingCard";
import '../consts'

class Game extends Component {
  
  constructor(props){
    super(props)
    this.playACard = this.playACard.bind(this)
    this.getMatch()
    this.initDeck()
    this.getMatch()
    this.state = {
      selfData : {},
      opponentsData : {}
    }
  }

  async initDeck(){
    let requestUrl = SERVER_URL + '/match/initDeck?deck='
    requestUrl += JSON.stringify(this.props.userReducer.deck)
    requestUrl += "&token=" + this.props.userReducer.userData.data.token
    await axios.get(requestUrl).then((response) => {
    })
  }

  async getMatch(){
    await axios.get(SERVER_URL + '/match/getMatch?token=' + this.props.userReducer.userData.data.token).then(reponse=>{
      if (this.props.userReducer.isPlayerOne){
        this.setState({selfData : reponse.data.data.player1,
                      opponentsData : reponse.data.data.player2
                      })
      }
      else{
        this.setState({selfData : reponse.data.data.player2,
                      opponentsData : reponse.data.data.player1,
          })
      }
  })
  }

  transfromHand(hand){
    let result = []
    if (hand !== undefined){
      hand.map(champ =>{
        let roundedAttack = Math.round(champ.stats.attackdamage)
        let roundedArmor = Math.round(champ.stats.armor)
        result.push({keyChamp : champ.key , name : champ.name , attack : roundedAttack , armor : roundedArmor})
      })
    }
    return result
  }

  async playACard(index){
    const {hand} = this.state.selfData
    // if (this.state.selfData.turn){
      await axios.get(
        SERVER_URL + 'match/playcard?card=' + hand[index].key + '&token=' + this.props.userReducer.userData.data.token
      )
      this.getMatch()
    // }
  }


  render() {
    const {selfData , opponentsData} = this.state
    return (

      <div className='game'>
        <div className='panel'>
          <Character 
            hp = {opponentsData.hp || '?'}
            ap = {'?'} 
            nbCarteDeck = {opponentsData.deck || '?'}
            name = {opponentsData.name || '?'}/>
          <Hand 
          type={'opponent'}
          cards ={opponentsData.hand}/>
        </div>
        <div className='board' style={{marginBottom:'7px'}}>
          <Board
          type={'opponent'}
          cards ={[]}/>
        </div>
        <div className='board' style={{marginTop:'7px'}}>
          <Board 
          type={'self'}
          cards ={[]}/>
        </div>
        <div className='panel'>
          <Character 
            hp={selfData.hp || '?'}
            ap = {'?'}
            nbCarteDeck = {selfData.deck || '?'}
            name = {selfData.name || '?'}
            />
          <Hand 
          type = {'self'}
          cards = {this.transfromHand(selfData.hand)}
          onCardClick = {this.playACard}/>
        </div>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Game)

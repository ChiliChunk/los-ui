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
import { Button } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import ClearIcon from '@material-ui/icons/Clear';

class Game extends Component {
  
  constructor(props){
    super(props)
    this.playACard = this.playACard.bind(this)
    this.getMatch()
    this.initDeck()
    this.getMatch()
    this.state = {
      selfData : {},
      opponentsData : {},
      apPoints : 0
    }
    setInterval(
      () => this.getMatch(),3000
    )
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
      if (typeof reponse.data.data.player2.hand == "number"){
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

  transformCardFormat(champsArray){
    let result = []
    if (champsArray !== undefined){
      champsArray.map(champ =>{
        let roundedAttack = Math.round(champ.stats.attackdamage)
        let roundedArmor = Math.round(champ.stats.armor)
        result.push({keyChamp : champ.key , name : champ.name , attack : roundedAttack , armor : roundedArmor , canAttack:!champ.attack})
      })
    }
    return result
  }

  async playACard(index){
    const {hand} = this.state.selfData
    // if (this.state.selfData.turn){
    console.log(hand[index].key)  
    await axios.get(
         SERVER_URL + '/match/playCard?card=' + hand[index].key + '&token=' + this.props.userReducer.userData.data.token
      ).then(reponse=>{
        if (reponse.data.status !== "error"){
          this.addActionPoint()
        }
      })
      this.getMatch()
      
    // }
  }

  addActionPoint(){
    let {apPoints} = this.state
      apPoints += 1
      this.setState({
        apPoints
      })
  }

  async endTurn(){
    
    await axios.get(
      SERVER_URL + '/match/endTurn?token=' + this.props.userReducer.userData.data.token
      )
      this.setState({apPoints : 0})
    this.getMatch()
  }

  async pickCard(){
    await axios.get(
      SERVER_URL + '/match/pickCard?token=' + this.props.userReducer.userData.data.token
      )
      .then(reponse=>{
        if (reponse.data.status !== "error"){
          this.addActionPoint()
        }
      })
    this.getMatch()
  }

  render() {
    const {selfData , opponentsData , apPoints} = this.state
    return (

      <div className='game'>
        <div className='opponentPanel'>
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
          cards ={this.transformCardFormat(opponentsData.board)}/>
        </div>
        <div className='board' style={{marginTop:'7px'}}>
          <Board 
          type={'self'}
          cards ={this.transformCardFormat(selfData.board)}/>
        </div>
        <div className='selfPanel'>
          <Character 
            clickOnHero = {this.pickCard.bind(this)}
            hp={selfData.hp || '?'}
            ap = {apPoints}
            nbCarteDeck = {selfData.deck || '?'}
            name = {selfData.name || '?'}
            />
          <Hand 
          type = {'self'}
          cards = {this.transformCardFormat(selfData.hand)}
          onCardClick = {this.playACard}/>
           <Fab variant="extended" aria-label="Delete" onClick={() => this.endTurn()}>
            <ClearIcon />
            {selfData.turn ? 'Fin de tour' : `Tour adverse`}
          </Fab>
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

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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Game extends Component {
  
  constructor(props){
    super(props)
    this.playACard = this.playACard.bind(this)
    this.getMatch()
    this.initDeck()
    this.getMatch()
    this.state = {
      selfData : {},
      opponentData : {},
      apPoints : 0,
      selfCard : null,
      opponentCard : null,
      playerNumber : null,
      renderLooseDialog : false,
      renderWinDialog : false
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
                      opponentData : reponse.data.data.player2,
                      playerNumber : '1'
                      })
      }
      else{
        this.setState({selfData : reponse.data.data.player2,
                      opponentData : reponse.data.data.player1,
                      playerNumber : '2'
          })
      }
      if (reponse.data.data.player2.hp <= 0 || reponse.data.data.player2.hp <= 0){
        if(reponse.data.status.charAt(7) === this.state.playerNumber){
          console.log('YOU WIN')
           this.setState({
            renderWinDialog : true,
          })
        }
        else{
          console.log('YOU LOOSE')
          this.setState({
            renderLooseDialog : true,
          } , () => {console.log(this.state)})
        }
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

  selectCardsToAttack(index , type){
    const {selfData , opponentData} = this.state
    if (type === 'self'){
      this.setState({
        selfCard : selfData.board[index].key
      } , () => this.proceedAttack())
      console.log(selfData.board[index].key)
    }
    else{
      this.setState({
        opponentCard : opponentData.board[index].key
      } , () => this.proceedAttack())
      console.log(opponentData.board[index].key)

    }
    
  }

  async proceedAttack(){
    const {opponentCard , selfCard , opponentData} = this.state
    if (opponentCard !== null && opponentCard !== undefined && selfCard !== null && selfCard !== undefined){
      await axios.get(
        SERVER_URL + '/match/attack?card=' + selfCard + '&ennemyCard=' + opponentCard + '&token='+this.props.userReducer.userData.data.token
        )
        .then(reponse=>{
          if (reponse.data.status !== "error"){
            this.addActionPoint()
          }
        })
    }
    if( selfCard !== null && selfCard !== undefined && opponentData.board.length ===0){
      await axios.get(
        SERVER_URL + '/match/attackPlayer?card='+ selfCard +'&token='+this.props.userReducer.userData.data.token
        )
        .then(reponse=>{
          if (reponse.data.status !== "error"){
            this.addActionPoint()
          }
        })
    }
    this.getMatch()
  }

  handleDialogClose(){
      axios.get(
        SERVER_URL + '/match/finishMatch?token='+this.props.userReducer.userData.data.token
        )
      this.props.history.push(process.env.PUBLIC_URL + "/home")
  }

  renderMatchFinishedDialog(){
    const {renderLooseDialog , renderWinDialog , opponentData , selfData} = this.state
    return(
      <Dialog
          open={renderLooseDialog || renderWinDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{renderWinDialog ? 'Vous Avez gagné 👍' : 'Vous avez perdu 👎'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {renderWinDialog ?
                'Vous avez gagné contre ' + opponentData.name +  '( '+ Math.round(selfData.hp) +' à '+ Math.round(opponentData.hp) + ' )'  :
                'Vous avez perdu contre ' + opponentData.name +  '( '+ Math.round(selfData.hp) +' à '+ Math.round(opponentData.hp) + ' )'  }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.setState({renderLooseDialog : false , renderWinDialog : false})}} color="primary" autoFocus>
              Retour a l'accueil
            </Button>
          </DialogActions>
        </Dialog>
    )
  }

  render() {
    const {selfData , opponentData , apPoints} = this.state
    return (

      <div className='game'>
      {this.renderMatchFinishedDialog()}
        <div className='opponentPanel'>
          <Character 
            hp = {opponentData.hp || '?'}
            ap = {'?'} 
            nbCarteDeck = {opponentData.deck || '?'}
            name = {opponentData.name || '?'}/>
          <Hand 
          type={'opponent'}
          cards ={opponentData.hand}/>
        </div>
        <div className='board' style={{marginBottom:'7px'}}>
          <Board
          type={'opponent'}
          onBoardClick = {this.selectCardsToAttack.bind(this)}
          cards ={this.transformCardFormat(opponentData.board)}/>
        </div>
        <div className='board' style={{marginTop:'7px'}}>
          <Board 
          type={'self'}
          turn = {selfData.turn}
          onBoardClick = {this.selectCardsToAttack.bind(this)}
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

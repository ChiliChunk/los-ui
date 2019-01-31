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

class Game extends Component {
  
  constructor(props){
    super(props)
    this.getMatch()
    this.initDeck()
    this.getMatch()
  }

  async initDeck(){
    let requestUrl = SERVER_URL + '/match/initDeck?deck='
    requestUrl += JSON.stringify(this.props.userReducer.deck)
    requestUrl += "&token=" + this.props.userReducer.userData.data.token
    console.log(requestUrl)
    await axios.get(requestUrl).then((response) => {
        console.log('init deck')
        console.log(response)
    })
  }

  async getMatch(){
    await axios.get(SERVER_URL + '/match/getMatch?token=' + this.props.userReducer.userData.data.token).then(reponse=>{
      console.log('getMatch')
      console.log(reponse)
      this.setState({matchData : reponse.data})
  })
  }
  render() {
    return (

      <div className='game'>
        <div className='panel'>
          <Character type={'opponent'} />
          <Hand 
          type={'opponent'}
          cards ={[{name:'test1',
                    attack : 12,
                    armor : 15}]}/>
        </div>
        <div className='board' style={{marginBottom:'7px'}}>
          <Board
          type={'opponent'}
          cards ={[{name:'test2',
                    attack : 12,
                    armor : 15}]}/>
        </div>
        <div className='board' style={{marginTop:'7px'}}>
          <Board 
          type={'self'}
          cards ={[{name:'test1',
                    attack : 12,
                    armor : 15},
                    {name:'test11',
                    attack : 12,
                    armor : 15}]}/>
        </div>
        <div className='panel'>
          <Character type={'self'}/>
          <Hand 
          type={'self'}
          cards ={[{name:'test1',
                    attack : 12,
                    armor : 15}]}/>
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

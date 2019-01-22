import React, { Component } from "react";

import Character from './Character' 
import Hand from './Hand' 
import Board from './Board'
import '../style/game.css'

class Game extends Component {
  render() {
    return (
      <div className='game'>
        <div className='panel'>
          <Character type={'opponent'} />
          <Hand type={'opponent'}/>
        </div>
        <div className='board' style={{marginBottom:'7px'}}>
          <Board type={'opponent'}/>
        </div>
        <div className='board' style={{marginTop:'7px'}}>
          <Board type={'self'}/>
        </div>
        <div className='panel'>
          <Character type={'self'}/>
          <Hand type={'self'}/>
        </div>
      </div>
    );
  }
}

export default Game;

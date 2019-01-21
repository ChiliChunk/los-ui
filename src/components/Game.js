import React, { Component } from "react";

import Character from './Character' 
import Hand from './Hand' 
import Board from './Board'
import '../style/game.css'

class Game extends Component {
  render() {
    return (
      <div className='game'>
        <h3 onClick={() => {console.log(this.props)}}>TEST</h3>
        <div className='panel'>
          <Character type={'opponent'} />
          <Hand type={'opponent'}/>
        </div>
        <div className='board'>
          <Board type={'opponent'}/>
        </div>
        <div className='board'>
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

import React, { Component } from "react";

import Character from './Character' 
import Hand from './Hand' 
import Board from './Board'
import DeckMaker from './DeckMaker'
import '../style/game.css'

class Game extends Component {

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

export default Game;

import React, { Component } from "react";

import Character from './Character' 

class Game extends Component {
  render() {
    return (
      <div>
        <Character type={'opponent'}/>
        <Character type={'self'}/>
      </div>
    );
  }
}

export default Game;

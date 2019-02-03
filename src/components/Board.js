import React from 'react'
import '../style/board.css'
import Card from './PlayingCard'
import PlayingCard from './PlayingCard';
class Board extends React.Component{
    render(){
        const {type , cards , onBoardClick , turn} = this.props
        return(
            <React.Fragment>
                {cards.map((card , index)=>{
                return(
                    <span key = {index} onClick={type === 'self' ? () => onBoardClick(index , 'self') : () => onBoardClick(index , 'opponent') }>
                        <PlayingCard
                            canAttack = {type === 'self' && turn ? card.canAttack : false} 
                            keyChamp = {card.keyChamp}
                            name={card.name}
                            attack={card.attack}
                            armor={card.armor}/>
                    </span>
                )
                })}
            </React.Fragment>
        )
    
    }
}

export default Board
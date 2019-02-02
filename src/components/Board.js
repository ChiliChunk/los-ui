import React from 'react'
import '../style/board.css'
import Card from './PlayingCard'
import PlayingCard from './PlayingCard';
class Board extends React.Component{
    render(){
        const {type , cards} = this.props
        return(
            <React.Fragment>
                {cards.map((card , index)=>{
                return(
                    <PlayingCard
                        keyChamp = {card.keyChamp}
                        key = {index}
                        name={card.name}
                        attack={card.attack}
                        armor={card.armor}/>
                )
                })}
            </React.Fragment>
        )
    
    }
}

export default Board
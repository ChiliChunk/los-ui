import React from 'react'
import '../style/hand.css'
import PlayingCard from './PlayingCard'
class Hand extends React.Component{

    render(){
        const {type , cards} = this.props
        if (type === 'self'){
            return(
                <div className='hand'>
                    {cards.map((card , index)=>{
                    return(
                    <span key={index} onClick={() => this.props.onCardClick(index)}>
                        <PlayingCard
                            keyChamp = {card.keyChamp}
                            name={card.name}
                            attack={card.attack}
                            armor={card.armor}
                            flipped = {false}/>
                    </span>
                    )
                    })}
                </div>
            )
        }
        else{
            return(
            <div className='hand'>
                    {[...Array(cards).keys()].map(index=>{ // in range js style
                    return(
                        <PlayingCard
                            key = {index}
                            flipped= {true}
                        />
                    )
                    })}
                </div>
            )
        }
    }
}
export default Hand
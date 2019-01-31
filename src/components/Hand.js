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
                        <PlayingCard
                            key={index}
                            name={card.name}
                            attack={card.attack}
                            armor={card.armor}
                            flipped = {false}/>
                    )
                    })}
                </div>
            )
        }
        else{
            return(
            <div className='hand'>
                    {[...Array(cards).keys()].map(elmt=>{ // 
                    return(
                        <PlayingCard
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
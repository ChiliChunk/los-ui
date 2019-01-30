import React from 'react'
import '../style/hand.css'
import PlayingCard from './PlayingCard'
class Hand extends React.Component{

    render(){
        const {type , cards} = this.props
        return(
            <div className='hand'>
                {cards.map((card , item)=>{
                return(
                    <PlayingCard
                        name={card.name}
                        attack={card.attack}
                        armor={card.armor}/>
                )
                })}
            </div>
        )
    }
}
export default Hand
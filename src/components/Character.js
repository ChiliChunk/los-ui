import React from 'react'
import '../style/character.css'


class Character extends React.Component{
    render(){
        const {ap,hp,name,nbCardDeck , imgUrl , highlightToPickCard} = this.props
        return(
            <div>
                {/* <span className='ap'>{ap && ap}/3</span> NO NEED MANA COUNT*/}
                <img src={imgUrl} className={highlightToPickCard ?'heroImg goldenHero' : 'heroImg'} onClick = {() => this.props.clickOnHero()}/>
                <span className='hp'>{hp && Math.round(hp)}</span>
                <span className ='nbCardDeck'>{nbCardDeck}/20</span>
                <span className = 'playerName'>{name}</span>
            </div>
        )
    }
}

export default Character
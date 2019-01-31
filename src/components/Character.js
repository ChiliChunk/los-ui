import React from 'react'
import '../style/character.css'

const tempURL = 'https://i.imgur.com/7qjvKyi.jpg'

class Character extends React.Component{
    render(){
        return(
            <div>
                <span className='ap'>{this.props.ap && this.props.ap}/3</span>
                <img src={tempURL} className='heroImg'/>
                <span className='hp'>{this.props.hp && this.props.hp}</span>
                <span className ='nbCarteDeck'>{this.props.nbCarteDeck}/20</span>
                <span className = 'playerName'>{this.props.name}</span>
            </div>
        )
    }
}

export default Character
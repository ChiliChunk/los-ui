import React from 'react'
import '../style/character.css'

const tempURL = 'https://i.imgur.com/7qjvKyi.jpg'

class Character extends React.Component{
    render(){
        return(
            <div className={this.props.type === 'opponent' ? 'opponentImg' : 'selfImg'}>
                <img src={tempURL} className='heroImg'/>
                <span className={this.props.type === 'opponent' ? 'opponentHp' : 'selfHp'}>HP</span>
            </div>
        )
    }
}

export default Character
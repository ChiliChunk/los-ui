import React from 'react'
import '../style/character.css'

const tempURL = 'https://i.imgur.com/7qjvKyi.jpg'

class Character extends React.Component{
    render(){
        return(
            <div>
                <span className='ap'>AP</span>
                <img src={tempURL} className='heroImg'/>
                <span className='hp'>HP</span>
            </div>
        )
    }
}

export default Character
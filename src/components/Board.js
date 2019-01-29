import React from 'react'
import '../style/board.css'
class Board extends React.Component{
    render(){
        const {type} = this.props
        if (type==='opponent'){
            return (
                <p>opponent Board</p>                
            )
        }
        else{
            return (
                <p>my Board</p>                
            ) 
        }
    }
}

export default Board
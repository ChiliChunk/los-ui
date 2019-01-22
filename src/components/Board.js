import React from 'react'
import '../style/board.css'
import Card from './Card'
class Board extends React.Component{
    render(){
        const {type} = this.props
        if (type==='opponent'){
            return (
                <Card flipped/>                
            )
        }
        else{
            return (
                <Card/>                
            ) 
        }
    }
}

export default Board
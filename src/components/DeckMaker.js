import React from 'react'
import '../style/deckMaker.css'
const champions = require('./champion.json')
class DeckMaker extends React.Component{
    constructor(props){
        super(props)
        let championsNotSelected = champions
        this.state = {
            championsNotSelected : championsNotSelected,
            championsSelected : []
        }
    }
    render(){
        console.log(champions)
        return(
            <span className="deckMaker">
                <div className="cardsPacked">
                    {(this.state.championsNotSelected || []).map((champions,index) =>{
                        return(
                            <h3>test</h3>
                        )
                    })}
                </div>
                <div className="cardsPacked">
                    <h3>Test</h3>
                </div>
            </span>
        )
    }
}

export default DeckMaker


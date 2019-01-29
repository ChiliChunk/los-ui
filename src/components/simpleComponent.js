import React from 'react'

class simpleComponent extends React.Component{
    render(){
        return(
            <h1 onClick={()=>{console.log(this.props)}}>Test</h1>
        )
    }
}

export default simpleComponent
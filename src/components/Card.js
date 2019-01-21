import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import '../style/playingCard.css'
/*
props : urlImage : string
        title : string
        attackDamage : string / number
        armor : string / number
        description : ?

*/
class PlayingCard  extends React.Component{
    render(){
        return(
            <Card className='card'>
                <CardActionArea>
                    <img 
                        className="imgCard" 
                        src="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                    />
                    <CardContent>
                        <span className="title">
                            Lizard
                        </span>
                        <span className="attack">
                            attack : 3
                        </span>
                        <span className="armor">
                            armor : 5
                        </span>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}



export default PlayingCard
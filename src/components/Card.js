import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../style/playingCard.css'
class PlayingCard  extends React.Component{
    render(){
        return(
            <Card className='card'>
                <CardActionArea>
                    <CardMedia
                        className='media'
                        image="./ninja.jpg"
                        title="A card"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}

export default PlayingCard
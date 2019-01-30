import React from 'react'
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../style/playingCard.css'
/*
props : urlImage : string
        title : string
        attackDamage : string / number
        armor : string / number
        description : ?

*/
class PlayingCard extends React.Component {
    renderFace() {
        const { name, attack, armor, keyChamp } = this.props
        return (
            <Card className='card'>
                <CardActionArea>
                    <img
                        className="imgCard"
                        src={"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + keyChamp + "_0.jpg"}
                    />
                    <CardContent>
                        <span className="title">
                            {name}
                        </span>
                        <br />
                        <span className="attack">
                            attack : {attack}
                        </span>
                        <br />
                        <span className="armor">
                            armor : {armor}
                        </span>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }

    renderBack() {
        return (
            <Card className='card opponent'>
                <CardActionArea>
                    <img
                        className="backCard"
                        src="https://i.imgur.com/fWxwxXD.png"
                    />
                </CardActionArea>
            </Card>
        )
    }

    render() {
        return (
            <div>
                {this.props.flipped ? this.renderBack() : this.renderFace()}
            </div>
        )
    }


}



export default PlayingCard
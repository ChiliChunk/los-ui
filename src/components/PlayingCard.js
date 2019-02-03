import React from 'react'
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SvgIcon from '@material-ui/core/SvgIcon';
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
            <Card className='card' raised>
                <CardActionArea>
                    <img
                        className="imgCard"
                        src={"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + keyChamp + "_0.jpg"}
                    />
                    <CardContent className="content">
                        <span className="title">
                            {name}
                        </span>
                        <div className="characs">
                            <span className="charac">
                                <svg className="attack">
                                    <path d="M6.92,5H5L14,14L15,13.06M19.96,19.12L19.12,19.96C18.73,20.35 18.1,20.35 17.71,19.96L14.59,16.84L11.91,19.5L10.5,18.09L11.92,16.67L3,7.75V3H7.75L16.67,11.92L18.09,10.5L19.5,11.91L16.83,14.58L19.95,17.7C20.35,18.1 20.35,18.73 19.96,19.12Z" />
                                </svg>
                                {attack}
                            </span>
                            <span className="charac" >
                                <svg className="health">
                                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                                </svg>
                                {armor}
                            </span>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }

    renderBack() {
        return (
            <img className="imgBack"
                src="https://www.hearthstonetopdecks.com/wp-content/uploads/2014/06/card-back-tespa-199x300.png"
            />
        )
    }

    render() {
        if (this.props.flipped) {
            return this.renderBack()
        } else {
            return this.renderFace()
        }
    }


}



export default PlayingCard
import React from 'react'
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SvgIcon from '@material-ui/core/SvgIcon';
import '../style/playingCard.css'
import { sword, hearth } from '../style/constSvg'
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
            <Card raised className={this.props.canAttack ? 'canAttack card' : 'card'}>
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
                                    <path d={sword} />
                                </svg>
                                {attack}
                            </span>
                            <span className="charac" >
                                <svg className="health">
                                    <path d={hearth} />
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
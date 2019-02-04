import React from 'react'
import '../style/character.css'
import { cards, hearth } from '../style/constSvg'


class Character extends React.Component {
    render() {
        const { ap, hp, name, nbCardDeck, imgUrl, highlightToPickCard } = this.props
        return (
            <div className="hero">
                {/* <span className='ap'>{ap && ap}/3</span> NO NEED MANA COUNT*/}
                <img src={imgUrl} className={highlightToPickCard ? 'heroImg goldenHero' : 'heroImg'} onClick={() => this.props.clickOnHero()} />
                <div className="informations">
                    <span className='recap'>
                        <svg className="lifeSvg">
                            <path d={hearth} />
                        </svg>
                        {hp && Math.round(hp)}
                    </span>
                    <span className='recap'>
                        <svg className="deckSvg">
                            <path d={cards} />
                        </svg>
                        {nbCardDeck}
                    </span>
                    <span className='playerName'>{name}</span>
                </div>
            </div>
        )
    }
}

export default Character
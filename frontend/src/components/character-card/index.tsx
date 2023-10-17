import { FunctionalComponent, h } from 'preact';
import { core } from '~core';
import './style.scss';

interface CharacterCardProps {
    character: core.Character;
}

const pickHex = (color1: number[], color2: number[], weight: number) => {
    const w1 = weight;
    const w2 = 1 - w1;
    const rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

export const CharacterCard: FunctionalComponent<CharacterCardProps> = ({ character }) => {

    const steppedGradient = (w: number) => pickHex([229, 94, 21], [139, 63, 159], w);
    
    return (
        <div className="character-card">
            <img className="character-card--img" src={character.imageUrl} />
            <div className="character-card--hp">
                <span className="num">{character.maxHP}</span>
                <span className="text">hp</span>
            </div>
            <div className="character-card--defense">
                <img className='shield-icon' src={'/assets/icons/shield2.svg'} alt="" />
                <span className="text">{character.defense}</span>
            </div>
            <div className="character-card--ids">
                <h1 className="character-card--name">{character.name}</h1>
                <h2 className="character-card--subtitle">
                    {character.classLevels.map(cl => `${cl.level} ${cl.className}`).join(' / ')}
                </h2>
                <div>
                    {character.maxSpellSlots.map((ss, i) => {
                        return (<span style={`background: ${steppedGradient(i/8)}`} className="character-card--spells">{ss}</span>)
                    })}
                </div>
            </div>
        </div>
    );
};
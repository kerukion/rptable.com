import './style.scss';
import { FunctionalComponent, h } from 'preact';
import { core } from '~core';

interface CreatureCardProps<T extends core.Creature> {
    creature: T;
}

const pickHex = (color1: number[], color2: number[], weight: number) => {
    const w1 = weight;
    const w2 = 1 - w1;
    const rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2)];
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

export const CreatureCard = <T extends core.Creature>({
    creature,
}: CreatureCardProps<T>): ReturnType<FunctionalComponent<CreatureCardProps<T>>> => {

    const steppedGradient = (w: number) => pickHex([229, 94, 21], [139, 63, 159], w);

    return (
        <div className='creature-card'>
            <img className='creature-card--img' src={creature.imageUrl} />
            <div className='creature-card--hp'>
                <span className='num'>{creature.maxHP}</span>
                <span className='text'>hp</span>
            </div>
            <div className='creature-card--defense'>
                <img className='shield-icon' src={'/assets/icons/shield.svg'} alt='' />
                <span className='text'>{creature.defense}</span>
            </div>
            <div className='creature-card--ids'>
                <h1 className='creature-card--name'>{creature.name}</h1>
                <h2 className='creature-card--subtitle'>
                    {creature.classLevels?.map(cl => `${cl.level} ${cl.className}`).join(' / ')}
                </h2>
                <div>
                    {creature.maxSpellSlots.map((ss, i) => (
                        <span key={i} style={`background: ${steppedGradient(i / 8)}`} className='creature-card--spells'>
                            {ss}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
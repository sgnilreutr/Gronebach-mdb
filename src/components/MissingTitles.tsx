import React from 'react'
import DetailHeader from './DetailHeader'
import './MissingTitles.scss'

const missing_titles = [
    'Attack on the Queen',
    'De Ondergrondse Vergeet Niet',
    'De Oorlog van de Eeuw 1',
    'De Oorlog van de Eeuw 2',
    'De Oorlog van de Eeuw 3',
    'De Oorlog van de Eeuw 4',
    'De Oorlog van de Eeuw 5',
    'De Oorlog van de Eeuw 6',
    's Werelds mooiste nationale parken Afrika en Europa',
    's Werelds mooiste nationale parken Azie en Oceanie',
    'Slag om Arnhem',
    'When the Party is over',
]

export default function Missingtitles() {
    return (
        <div>
            <DetailHeader />
            <div>
                <h1>Ontbrekende titels <span role="img" aria-label="magnifying_glass_tilted_right">🔍</span></h1>
                <p>Onderstaande titels konden online niet gevonden worden.</p>
                {missing_titles.map(title => {
                    return <li className="missing_title">{title}</li>
                })}
            </div>
        </div>
    )
}

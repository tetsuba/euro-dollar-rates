import React from 'react'
import { Link } from 'react-router-dom'

export default function List(props) {
    const { list, label, link } = props

    function getListItem(name) {
        return (
            <li className="list-group-item" key={name}>
                {link ? (
                    <a href={`${link}${name}`} target="_blank" rel="noreferrer">
                        {name}
                    </a>
                ) : (
                    <Link to={`/market-watch/futures/${name}`}>{name}</Link>
                )}
            </li>
        )
    }

    return (
        <ul className="list-group list-group-flush">
            <li className="list-group-item shadow-sm">
                <h5 className="mt-3">{label}</h5>
            </li>
            {list.map(getListItem)}
        </ul>
    )
}

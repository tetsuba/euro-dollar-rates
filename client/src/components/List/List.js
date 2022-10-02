import React from 'react'
import ListHeader from './ListHeader'

export default function List(props) {
    const { list, renderItem, listHeader, partialKey } = props

    function renderListItem(args, i) {
        return (
            <li className="list-group-item" key={`${partialKey + i}`}>
                {renderItem(args, i)}
            </li>
        )
    }

    return (
        <ul className="list-group list-group-flush">
            {listHeader && (
                <ListHeader>
                    <h5 className="mt-3">{listHeader}</h5>
                </ListHeader>
            )}

            {list.map(renderListItem)}
        </ul>
    )
}

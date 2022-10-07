import React from 'react'
import ListHeader from './ListHeader'

export interface PropTypes {
    list: any[]
    renderItem: (args: any, i: number) => JSX.Element
    listHeader?: string
    partialKey: string
}

export default function List(props: PropTypes): JSX.Element {
    const { list, renderItem, listHeader, partialKey } = props

    function renderListItem(args: any, i: number) {
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

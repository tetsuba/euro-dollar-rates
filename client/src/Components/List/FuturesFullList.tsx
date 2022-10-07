import React from 'react'
import List from './List'

interface PropTypes {
    list: string[]
    text: string
}

export default function FuturesFullList({ list, text }: PropTypes): React.ReactElement {
    const renderList = text !== ''

    function renderLinkItem(name: string) {
        return (
            <a
                href={`https://www.marketwatch.com/investing/future/${name}`}
                rel="noopener"
                data-testid="external-link"
            >
                {name}
            </a>
        )
    }

    return renderList
        ? (
            <List
                partialKey="ffl-"
                renderItem={renderLinkItem}
                listHeader="Full List"
                list={list}
            />
        )
        : <></>
}

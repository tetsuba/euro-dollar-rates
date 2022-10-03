import React from 'react'
import List from './List'

export default function FuturesFullList({ list, text }) {
    function renderLinkItem(name) {
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

    return (
        text !== '' && (
            <List
                partialKey="ffl-"
                renderItem={renderLinkItem}
                listHeader="Full List"
                list={list.filter((name) => name.startsWith(text))}
            />
        )
    )
}

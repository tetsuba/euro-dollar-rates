import React from 'react'
import { Link } from 'react-router-dom'
import List from './List'

interface PropTypes {
    list: string[]
    text: string
}

export default function FuturesGroupList({ list, text }: PropTypes) {
    const renderList = text !== ''
    function renderLinkItem(name: string) {
        return (
            <Link
                to={`/market-watch/futures/${name}`}
                data-testid="internal-link"
            >
                {name}
            </Link>
        )
    }

    return renderList
        ? (
            <List
                partialKey="fgl-"
                renderItem={renderLinkItem}
                listHeader="Group List"
                list={list}
            />
        )
        : <></>
}

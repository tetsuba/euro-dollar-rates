import React from 'react'
import { Link } from 'react-router-dom'
import List from './List'

export default function FuturesGroupList({list, text}) {
  function renderLinkItem(name) {
    return (
      <Link
        to={`/market-watch/futures/${name}`}
        data-testid="internal-link"
      >
        {name}
      </Link>
    )
  }

  return (
    text !== '' && (
      <List
        partialKey="fgl-"
        renderItem={renderLinkItem}
        listHeader="Group List"
        list={list.filter((name) => name.startsWith(text))}
      />
    )
  )
}

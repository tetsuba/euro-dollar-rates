import React from 'react'
import List from './List';

export default function FilterList(props) {
  const {list, text, label, link} = props
  return (
    (text !== '')
    && <List
        link={link}
        label={label}
        list={list.filter((name) => name.startsWith(text))}
      />
  )
}
import React from 'react'

export default function ListHeader(props) {
  return (
    <li className="list-group-item shadow-sm">
      {props.children}
    </li>
  )
}
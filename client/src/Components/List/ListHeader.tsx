import React from 'react'

interface PropTypes {
    children: JSX.Element
}

export default function ListHeader(props: PropTypes) {
    return <li className="list-group-item shadow-sm">{props.children}</li>
}

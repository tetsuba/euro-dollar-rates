import React from 'react'
import {InputElementType} from "../../utils/types"

interface PropTypes {
    label: string
    inputFunc: (e: InputElementType) => void
    text: string
}

export default function SearchBox(props: PropTypes): JSX.Element {
    const { label, inputFunc, text } = props
    return (
        <div className="input-group input-group-lg">
            <span className="input-group-text" id="inputGroup-sizing-lg">
                {label}
            </span>
            <input
                data-testid="search-input"
                value={text}
                onChange={inputFunc}
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
            />
        </div>
    )
}

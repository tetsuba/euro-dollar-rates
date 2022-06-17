import React from 'react'

export default function SearchBox(props) {
    const { label, inputFunc, text } = props
    return (
        <div className="input-group input-group-lg">
            <span className="input-group-text" id="inputGroup-sizing-lg">
                {label}
            </span>
            <input
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

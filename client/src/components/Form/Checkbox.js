// TODO: I have added an onChange to the input to stop the react error from firing.
//       Look for a better solution.

import React from 'react'

export default function Checkbox({ label, checked, onClick, index }) {
    return (
        <div
            className="form-check"
            data-testid="checkbox-custom"
            onClick={onClick}
            index={index}
            data-checked={checked}
        >
            <input
                className="form-check-input pe-none"
                type="checkbox"
                checked={checked}
                id="flexCheckDefault"
                onChange={() => {}}
            />
            <label
                className="form-check-label pe-none"
                htmlFor="flexCheckDefault"
            >
                {label}
            </label>
        </div>
    )
}

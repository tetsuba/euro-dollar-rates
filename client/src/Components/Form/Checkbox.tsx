// TODO: I have added an onChange to the input to stop the react error from firing.
//       Look for a better solution.

import React from 'react'
import {EventClickType} from "../../utils/types";

export interface CheckboxProps {
    key?: string
    label: string,
    checked: boolean,
    onClick: (e: EventClickType) => void,
    index: number,
}

export default function Checkbox({ label, checked, onClick, index }: CheckboxProps): JSX.Element {
    return (
        <div
            className="form-check"
            data-testid="checkbox-custom"
            onClick={onClick}
            data-index={index}
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

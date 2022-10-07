import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function BreadCrumbs(): JSX.Element {
    let location = useLocation()
    const [crumbs] = useState(location.pathname.split('/').slice(1))

    function renderCrumb(text: string, i: number) {
        const path = crumbs
            .slice(0, i + 1)
            .toString()
            .replace(/,/g, '/')
            .replace(/^/, '/')
        return crumbs.length - 1 === i ? (
            <li
                className="breadcrumb-item active"
                aria-current="page"
                key={i + text}
            >
                {text}
            </li>
        ) : (
            <li className="breadcrumb-item" key={i + text}>
                <Link to={path}>{text}</Link>
            </li>
        )
    }

    return (
        <div className="row shadow mb-5">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb mt-3">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    {crumbs.map(renderCrumb)}
                </ol>
            </nav>
        </div>
    )
}

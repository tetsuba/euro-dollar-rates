import React from 'react'
import { Link } from 'react-router-dom'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'

export default class MarketWatch extends React.Component {
    render() {
        return (
            <>
                <BreadCrumbs />

                <h3>Market Watch</h3>
                <div className="row mt-3">
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">Futures</h5>
                            <p className="card-text">
                                Click on the button below to view market watch
                                futures list codes
                            </p>
                            <Link to="futures" className="btn btn-primary">
                                Click here
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

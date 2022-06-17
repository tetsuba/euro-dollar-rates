import React from 'react'
import { Link } from 'react-router-dom';

export default class Home extends React.Component {

  render() {
    return (
      <div className="row mt-3">
        <div className="card" style={{width: '18rem'}}>
          <div className="card-body">
            <h5 className="card-title">Market Watch</h5>
            <Link to="market-watch" className="btn btn-primary">Click here</Link>
          </div>
        </div>
      </div>
    )
  }
}

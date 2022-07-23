import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './screens/Home/Home'
import MarketWatch from './screens/MarketWatch'
import Futures from './screens/MarketWatch/Futures'
import Future from './screens/MarketWatch/Future'
import Header from './components/Header/Header'

export default function App() {
    return (
        <div className="container">
            <Header />
            <Router>
                <Routes>
                    <Route path="*" element={<h1>ERROR PAGE</h1>} />
                    <Route path="/" element={<Home />} />
                    <Route path="market-watch/">
                        <Route path="" element={<MarketWatch />} />
                        <Route path="futures" element={<Futures />} />
                        <Route path="futures/:symbol" element={<Future />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}

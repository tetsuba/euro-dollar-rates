import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './Screens/Home/Home'
import MarketWatch from './Screens/MarketWatch/MarketWatch'
import Futures from './Screens/MarketWatch/Futures'
import Future from './Screens/MarketWatch/Future'
import Header from './Components/Header/Header'

export default function App() {
    return (
        <div className="container">
            <Header />
            <Routes>
                <Route path="*" element={<h1>ERROR PAGE</h1>} />
                <Route path="/" element={<Home />} />
                <Route path="market-watch/">
                    <Route path="" element={<MarketWatch />} />
                    <Route path="futures" element={<Futures />} />
                    <Route path="futures/:symbol" element={<Future />} />
                </Route>
            </Routes>
        </div>
    )
}

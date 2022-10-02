import React from 'react'
import List from './List'
import Checkbox from '../Form/Checkbox'

export default function FutureCheckBoxList({ list, onClick }) {
    function renderLinkItem({ month, year, price, checked }, index) {
        return (
            <Checkbox
                key={`cb-${index}`}
                index={index}
                label={`${year}/${month} - ${price}`}
                checked={checked}
                onClick={onClick}
            />
        )
    }

    return <List renderItem={renderLinkItem} list={list} partialKey="fcbl-" />
}

import React from 'react'
import List from './List'
import Checkbox from '../Form/Checkbox'
import { EventClickType, FutureType } from '../../utils/types'

interface FutureListTypes {
    month: string
    year: string
    price: string
    checked: boolean
}

interface PropTypes {
    list: FutureType[]
    onClick: (e: EventClickType) => void
}

export default function FutureCheckBoxList({
    list,
    onClick,
}: PropTypes): JSX.Element {
    function renderLinkItem(
        { month, year, price, checked }: FutureListTypes,
        index: number
    ) {
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

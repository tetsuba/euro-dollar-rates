import React from 'react'

export type InputElementType = React.ChangeEvent<HTMLInputElement>

export type EventClickType = React.MouseEvent

export type FuturesNameType = string

export type FuturesListType = {
    name: FuturesNameType
    link: string
}

export type FuturesType = {
    list: FuturesListType[]
    date: string
}

export type FutureType = {
    checked?: boolean
    month: string
    name: string
    price: string
    symbol: string
    year: number
}

export type FutureLineChartType = {
    labels: string[]
    prices: string[]
}

export type FutureListType = {
    month: string
    price: string
    year: string
}



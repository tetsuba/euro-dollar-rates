import React from 'react'
import { render } from '@testing-library/react'
import List, { PropTypes } from '../List'

describe('List', () => {
    const mockProps: PropTypes = {
        list: ['mock item 1', 'mock item 2'],
        renderItem: (name) => <div>{name}</div>,
        partialKey: 'mock-',
    }

    test('render with list header ', () => {
        const { asFragment } = render(
            <List {...mockProps} listHeader="Mock Header" />
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test('render without list header ', () => {
        const { asFragment } = render(<List {...mockProps} />)
        expect(asFragment()).toMatchSnapshot()
    })
})

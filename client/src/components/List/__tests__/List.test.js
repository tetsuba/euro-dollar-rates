import { render } from '@testing-library/react'
import List from '../List'

describe('List', () => {
    const mockProps = {
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

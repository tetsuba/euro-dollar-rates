import React from 'react'
import { render } from '@testing-library/react'
import SearchBox from '../SearchBox'

describe('SearchBox', () => {
    const mockProps = {
        label: 'Search Box',
        inputFunc: () => {},
        text: ''
    }

    test('rendered', () => {
        const { asFragment } = render(<SearchBox {...mockProps} />)
        expect(asFragment()).toMatchSnapshot()
    })
})

import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../Home'

describe('MarketWatch', () => {
    test('should render screen', () => {
        const { asFragment } = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

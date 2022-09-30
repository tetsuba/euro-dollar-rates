import { render } from '@testing-library/react'
import MarketWatch from '../MarketWatch'
import { MemoryRouter } from 'react-router-dom'

describe('MarketWatch', () => {
  test('should render screen', () => {
    const { asFragment } = render(<MemoryRouter><MarketWatch /></MemoryRouter>)
    expect(asFragment()).toMatchSnapshot()
  })
})
import { render, screen, waitForElementToBeRemoved, fireEvent, prettyDOM } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Futures from '../Futures'
import axios from 'axios'
jest.mock('axios')

const mockData = {
  date: '12/10/2022',
  list: [
    { name: 'EDT290', link: 'http://mock-lick.com' },
    { name: 'EDT240', link: 'http://mock-lick.com' },
    { name: 'EDT303', link: 'http://mock-lick.com' },
  ]
}

describe('Futures', () => {
  test('should render a loading screen until api call is completed', async () => {
    axios.get.mockReturnValueOnce({data: mockData})

    const rendered = render(
      <MemoryRouter>
        <Futures />
      </MemoryRouter>
    )

    expect(rendered.asFragment()).toMatchSnapshot()
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
    expect(rendered.asFragment()).toMatchSnapshot()
  })

  describe('Event onChange search futures', () => {
    beforeEach(async () => {
      axios.get.mockReturnValueOnce({data: mockData})
      render(
        <MemoryRouter>
          <Futures />
        </MemoryRouter>
      )

      await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
      fireEvent.change(screen.getByTestId('search-input'), {target: {value: 'E'}})
    })

    test('should render a list of futures', () => {
      expect(screen.queryAllByTestId('external-link')).toHaveLength(3)
    })
    test('should render a grouped list of futures', () => {
      expect(screen.queryAllByTestId('internal-link')).toHaveLength(1)
    })
  })
})
import React from 'react'
import {
    render,
    screen,
    waitForElementToBeRemoved,
    fireEvent, waitFor,
} from '@testing-library/react'

import Futures from '../Futures'
import Wrapper from "../../../utils/Wrapper";
import axios from 'axios'

jest.mock('axios')

const mockData = {
    date: '12/10/2022',
    list: [
        { name: 'EDT290', link: 'http://mock-lick.com' },
        { name: 'EDT240', link: 'http://mock-lick.com' },
        { name: 'EDT303', link: 'http://mock-lick.com' },
    ],
}



describe('Futures', () => {
    test('should render a loading screen until api call is completed', async () => {
        // @ts-ignore
        axios.get.mockResolvedValue({ data: mockData, status: 200 })
        const rendered = render(<Wrapper pathname="/market-watch/futures"><Futures /></Wrapper>)
        expect(rendered.asFragment()).toMatchSnapshot()
        await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
        expect(rendered.asFragment()).toMatchSnapshot()
    })
    test('should render an error screen', async () => {
        // @ts-ignore
        axios.get.mockRejectedValueOnce()

        render(
            <Wrapper pathname="/market-watch/futures">
                <Futures />
            </Wrapper>
        )
        await waitFor(() => expect(screen.getByTestId('error-screen')))
    })

    describe('Event onChange search futures', () => {
        test('should render a list and a group list of futures', async () => {
            // @ts-ignore
            axios.get.mockResolvedValue({ data: mockData, status: 200 })
            render(<Wrapper pathname="/market-watch/futures"><Futures /></Wrapper>)

            await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
            fireEvent.change(screen.getByTestId('search-input'), {
                target: { value: 'E' },
            })

            expect(screen.queryAllByTestId('external-link')).toHaveLength(3)
            expect(screen.queryAllByTestId('internal-link')).toHaveLength(1)
        })
    })
})

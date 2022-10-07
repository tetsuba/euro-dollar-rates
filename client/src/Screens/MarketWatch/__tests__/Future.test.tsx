import React from 'react'
import axios from 'axios'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Future from '../Future'
import 'jest-canvas-mock'

jest.mock('axios')

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        symbol: 'ED',
    }),
}))

jest.mock('chart.js', () => {
    return jest.fn()
})

const mockData = {
    data: {
        list: [
            {
                year: 2021,
                month: '06',
                price: '1,000,000.50',
                name: 'Eurodollar 3 Month Jun 2021',
                symbol: 'EDM21',
            },
            {
                year: 2010,
                month: '06',
                price: '100,000',
                name: 'Eurodollar 3 Month Jun 2010',
                symbol: 'EDM10',
            },
            {
                year: 1999,
                month: '06',
                price: '1,000',
                name: 'Eurodollar 3 Month Jun 1999',
                symbol: 'EDM99',
            },
            {
                year: 2001,
                month: '06',
                price: '10,000',
                name: 'Eurodollar 3 Month Jun 2000',
                symbol: 'EDM01',
            },
        ],
    },
}

describe('Future', () => {
    // @ts-ignore
    axios.get.mockReturnValueOnce(mockData)

    const rendered = render(
        <MemoryRouter
            initialEntries={['', { pathname: '/market-watch/futures/ED' }]}
        >
            <Future />
        </MemoryRouter>
    )

    test('should render', async () => {
        await waitFor(() => expect(screen.getByTestId('future-checkbox-list')))
        expect(rendered.asFragment()).toMatchSnapshot()

        /* Event: onClick
         * Button: Create Chart
         * Test: should hide future checkbox list and display line chart
         *  */
        fireEvent.click(rendered.getByText(/Create Chart/i))
        await waitFor(() => expect(rendered.getByTestId('line-chart')))
        expect(rendered.queryByTestId('future-checkbox-list')).toBeNull()

        /* Event: onClick
         * Button: Back
         * Test: should hide line chart and display future checkbox list
         *  */
        fireEvent.click(rendered.getByText(/Back/i))
        await waitFor(() =>
            expect(rendered.getByTestId('future-checkbox-list'))
        )
        expect(rendered.queryByTestId('line-chart')).toBeNull()

        /* Test: all checkboxes should be checked = 'true'
         *  */
        rendered.queryAllByTestId('checkbox-custom').forEach((node) => {
            expect(node.getAttribute('data-checked')).toMatch('true')
        })

        /* Event: onClick
         * Checkbox: uncheck
         * Test: should uncheck the first checkbox in the list
         *  */
        const firstCheckBox = rendered.queryAllByTestId('checkbox-custom')[0]
        fireEvent.click(firstCheckBox)
        expect(firstCheckBox.getAttribute('data-checked')).toMatch('false')
    })
})

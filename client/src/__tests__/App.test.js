import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
    test('should load home page on first load', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )

        expect(screen.getByText(/Market Watch/i)).toBeInTheDocument()
    })

    test('should load a error page', () => {
        const badRoute = '/some/bad/route'

        render(
            <MemoryRouter initialEntries={[badRoute]}>
                <App />
            </MemoryRouter>
        )

        expect(screen.getByText(/ERROR PAGE/i)).toBeInTheDocument()
    })
})

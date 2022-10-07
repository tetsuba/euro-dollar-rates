import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Checkbox, { CheckboxProps } from '../Checkbox'

describe('Checkbox', () => {
    const mockProps: CheckboxProps = {
        key: 'cb-1',
        index: 1,
        label: '2022/06 - $100',
        checked: true,
        onClick: jest.fn(),
    }

    describe('render', () => {
        test('checkbox is checked', () => {
            const { asFragment } = render(<Checkbox {...mockProps} />)
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe('events', () => {
        test('onclick', () => {
            const mockClickHandler = jest.fn(() => {})
            render(<Checkbox {...mockProps} />)
            const button = screen.getAllByRole('checkbox')
            fireEvent.click(button[0])
            expect(mockProps.onClick).toHaveBeenCalledTimes(1)
        })
    })
})

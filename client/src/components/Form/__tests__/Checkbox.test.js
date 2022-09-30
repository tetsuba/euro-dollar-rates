import { render, screen, fireEvent } from '@testing-library/react'
import Checkbox from '../Checkbox'

describe('Checkbox', () => {

  const mockProps = {
    key: 'cb-1',
    index: '1',
    label: '2022/06 - $100',
    checked: true,
  }

  describe('render', () => {
    test('checkbox is checked', () => {
      const { asFragment } = render(<Checkbox {...mockProps} />)
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('events', () => {
    test('onclick', () => {
      const mockClickHandler = jest.fn()
      render(<Checkbox onClick={mockClickHandler} />)
      const button = screen.getAllByRole('checkbox')
      fireEvent.click(button[0])
      expect(mockClickHandler).toHaveBeenCalledTimes(1)
    })
  })
})

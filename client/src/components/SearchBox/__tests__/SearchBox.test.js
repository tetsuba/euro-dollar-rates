import {render} from '@testing-library/react'
import SearchBox from '../SearchBox'

describe('SearchBox', () => {
  const props = {
    label: 'Search Box',
    text: '',
    inputFunc: () => {}
  }

  test('rendered', () => {
    const { asFragment } = render(<SearchBox {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
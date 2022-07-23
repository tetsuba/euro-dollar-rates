import {render, screen} from '@testing-library/react'
import BreadCrumbs from '../BreadCrumbs'
import { MemoryRouter } from 'react-router-dom'

describe('BreadCrumbs', () => {
  const BREADCRUMB = {
    HOME: {TEXT: 'Home', PATH: '/'},
    PATH1: {TEXT: 'path1', PATH: '/path1'},
    PATH2: {TEXT: 'path2', PATH: '/path1/path2'},
    PATH3: {TEXT: 'path3', PATH: '/path1/path2/path3'}
  }

  function expectBreadCrumb({TEXT, PATH}, active) {
    const ele = screen.getByText(TEXT)
    if (active) {
      expect(ele).toHaveClass('active')
    } else {
      expect(ele.getAttribute('href')).toBe(PATH)
      expect(ele).not.toHaveClass('active')
    }
  }

  test('location path "/"', () => {
    render(
      <MemoryRouter initialEntries={['', { pathname: BREADCRUMB.HOME.PATH }]}>
        <BreadCrumbs />
      </MemoryRouter>,
    )
    expectBreadCrumb(BREADCRUMB.HOME, false)
  })
  test('location path "/path1"', () => {
    render(
      <MemoryRouter initialEntries={['', { pathname: BREADCRUMB.PATH1.PATH }]}>
        <BreadCrumbs />
      </MemoryRouter>,
    )
    expectBreadCrumb(BREADCRUMB.HOME, false)
    expectBreadCrumb(BREADCRUMB.PATH1, true)
  })
  test('location path "/path1/path2"', () => {
    render(
      <MemoryRouter initialEntries={['', { pathname: BREADCRUMB.PATH2.PATH }]}>
        <BreadCrumbs />
      </MemoryRouter>,
    )

    expectBreadCrumb(BREADCRUMB.HOME, false)
    expectBreadCrumb(BREADCRUMB.PATH1, false)
    expectBreadCrumb(BREADCRUMB.PATH2, true)
  })
  test('location path "/path1/path2/path3"', () => {
    render(
      <MemoryRouter initialEntries={['', { pathname: BREADCRUMB.PATH3.PATH }]}>
        <BreadCrumbs />
      </MemoryRouter>,
    )

    expectBreadCrumb(BREADCRUMB.HOME, false)
    expectBreadCrumb(BREADCRUMB.PATH1, false)
    expectBreadCrumb(BREADCRUMB.PATH2, false)
    expectBreadCrumb(BREADCRUMB.PATH3, true)
  })
})

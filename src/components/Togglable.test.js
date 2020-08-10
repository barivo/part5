import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'
import Blog from './Blog'

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable showButtonLabel="show..." removeButtonLabel="hide...">
        <div className="testDiv" />
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggle content can be closed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const closeButton = component.getByText('hide...')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})

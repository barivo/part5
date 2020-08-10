import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'some title',
      author: 'some author',
      url: 'www.someurl.com',
      likes: 99,
    }

    component = render(<Blog blog={blog} />)
  })

  test('renders content', () => {
    const div = component.container.querySelector('blog')
    const hidden = component.container.querySelector('.togglableContent')

    expect(component.container).toHaveTextContent('some title some author')
    expect(hidden).toHaveStyle('display: none')
  })

  test('toggles rest of blog into view when button "view" button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const hidden = component.container.querySelector('.togglableContent')

    expect(component.container).toHaveTextContent('99')
    expect(hidden).not.toHaveStyle('display: none')
  })
})

describe('like button', () => {
  test('when clicked twice the like button event handler is called twice', () => {
    const mockHandler = jest.fn()

    const blog = {
      title: 'some title',
      author: 'some author',
      url: 'www.someurl.com',
      likes: 99,
    }

    const component = render(<Blog blog={blog} incrementLikes={mockHandler} />)

    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

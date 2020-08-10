import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlog from './CreateBlog'

describe('<CreateBlog />', () => {
  test('calls the event handler with right details when adding a new blog', () => {
    const mockHandler = jest.fn()

    const user = { id: 1234 }
    const blog = {
      author: 'testing testing',
      title: 'testing is fun always and forever',
      url: 'www.jest.com',
    }
    const component = render(<CreateBlog addBlog={mockHandler} />)

    const createButton = component.getByText('create')

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    fireEvent.change(author, { target: { value: 'blog.author' } })
    fireEvent.change(title, { target: { value: 'blog.title' } })
    fireEvent.change(url, { target: { value: 'blog.url' } })

    fireEvent.click(createButton)

    expect(mockHandler).toHaveBeenCalledWith({
      author: 'blog.author',
      title: 'blog.title',
      url: 'blog.url',
    })
  })
})

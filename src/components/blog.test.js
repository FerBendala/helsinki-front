import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './blog'

describe( '<Blog />', () => {
    // Set components for all the tests
    const mockHandler = jest.fn()
    const blog = {
        title: 'El honor consiste en hacer hermoso aquello que uno está obligado a realizar',
        author: 'Alfred Victor de Vigny',
        url: 'https://www.ferbendala.com/es-otro-para-borrarse',
        likes: 11,
        id: '645f7859df7b32594c1f8c3f',
        user: {
            id: '645f58d5b66ceb14b4cc7661'
        }
    }
    let component

    beforeEach( () => {
        component = render(
            <Blog
                blog={blog}
                removeBlog={mockHandler}
            />
        )
    } )

    test( 'renders correct content', () => {
        const togglableContent = component.container.querySelector( '.togglableContent' )

        expect( component.container ).toHaveTextContent( blog.title )
        expect( togglableContent ).toHaveStyle( { display: 'none' } )
    } )

    test( 'renders correct content after clicking togglableContent', () => {
        const button = component.getByText( 'view' )
        const togglableContent = component.container.querySelector( '.togglableContent' )

        fireEvent.click( button )

        expect( togglableContent ).toHaveStyle( { display: 'block' } )
    } )

    test( 'clicking the remove blog button once', () => {
        const button = component.getByText( 'Remove' )

        fireEvent.click( button )

        expect( mockHandler.mock.calls ).toHaveLength( 1 )
    } )
} )
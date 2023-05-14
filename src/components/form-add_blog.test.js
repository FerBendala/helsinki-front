
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import FormAddBlog from './form-add_blog'

test( '<BlogForm /> updates parent state and calls onSubmit', () => {
    // Prepare test
    const createBlog = jest.fn()
    const component = render(
        <FormAddBlog createBlog={createBlog} />
    )

    // Set variables
    const form = component.container.querySelector( 'form' )
    const inputTitle = component.container.querySelector( '#title' )
    const inputAuthor = component.container.querySelector( '#author' )
    const inputUrl = component.container.querySelector( '#url' )

    // Complete form and submit
    fireEvent.change( inputTitle, {
        target: { value: 'testing of forms could be easier', }
    } )
    fireEvent.change( inputAuthor, {
        target: { value: 'OpenFullStack', }
    } )
    fireEvent.change( inputUrl, {
        target: { value: 'https://testing-of-forms-could-be-easier', }
    } )
    fireEvent.submit( form )

    // Expects
    expect( createBlog.mock.calls ).toHaveLength( 1 )
    expect( createBlog.mock.calls[0][0].title )
        .toBe( 'testing of forms could be easier' )
    expect( createBlog.mock.calls[0][0].author )
        .toBe( 'OpenFullStack' )
    expect( createBlog.mock.calls[0][0].url )
        .toBe( 'https://testing-of-forms-could-be-easier' )
} )
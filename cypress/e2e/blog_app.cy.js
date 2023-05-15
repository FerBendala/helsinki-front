describe( 'Blog app', function () {
    beforeEach( () => {
        cy.request( 'POST', `${Cypress.env( 'BACKEND' )}/testing/reset` )

        const user = {
            username: 'ferbendala',
            name: 'fernando bendala',
            password: 'fernandobendala1990'
        }

        cy.request( 'POST', `${Cypress.env( 'BACKEND' )}/users`, user )
        cy.visit( Cypress.env( 'BASE_URL' ) )
    } )

    it( 'front page can be opened', function () {
        cy.contains( 'Blog app, Fer Bendala, University of Helsinki 2023' )
    } )

    it( 'login form can be opened', function () {
        cy.contains( 'login' ).click()

        cy.get( '#username' ).type( 'ferbendala' )
        cy.get( '#password' ).type( 'fernandobendala1990' )

        cy.get( '#button-submit' ).click()
    } )

    it( 'login fails with wrong password', function () {
        cy.contains( 'login' ).click()

        cy.get( '#username' ).type( 'ferbendala' )
        cy.get( '#password' ).type( 'wrong' )

        cy.get( '#button-submit' ).click()
        cy.get( '.error' )
            .should( 'contain', 'Wrong username or password' )
            .and( 'have.css', 'color', 'rgb(255, 0, 0)' )
            .and( 'have.css', 'border-style', 'solid' )
            .and( 'have.css', 'border-color', 'rgb(255, 0, 0)' )

        cy.get( 'html' ).should( 'not.contain', 'fernando bendala logged-in' )
    } )

    describe( 'when logged in', () => {
        // Login with user
        beforeEach( function () {
            cy.login( {
                username: 'ferbendala',
                password: 'fernandobendala1990'
            } )
        } )

        describe( 'and a blog exists', function () {
            const blogs = [{
                title: 'El honor consiste en hacer hermoso aquello que uno está obligado a realizar',
                author: 'Alfred Victor de Vigny',
                url: 'https://ferbendala.com/el-honor-consiste-en-hacer-aquello-que-uno-esta-obligado-a-realizar',
                likes: 2
            }, {
                title: 'Mentir a los demás es como mentirse a uno mismo',
                author: 'Fernando Bendala',
                url: 'https://ferbendala.com/mentir-a-los-demas-es-como-mentirse-a-uno-mismo',
                likes: 1
            }, {
                title: 'La corona de la vida está en el ejercicio de la propia elección',
                author: 'Julio César',
                url: 'https://ferbendala.com/mentir-a-los-demas-es-como-mentirse-a-uno-mismo',
                likes: 0
            }]

            // Create new blog
            beforeEach( function () {
                cy.createBlog( blogs[0] )
                cy.createBlog( blogs[1] )
                cy.createBlog( blogs[2] )
            } )

            it( 'a new blog can be created', function () {
                cy.contains( blogs[0].title )
            } )

            it( 'a blog can be updated', function () {
                cy.contains( 'view' ).click()
                const newLike = blogs[0].likes + 1
                cy.contains( `Likes: ${blogs[0].likes}` ).click()
                cy.contains( `Likes: ${newLike}` )
            } )

            it( 'a blog can be removed', function () {
                cy.contains( 'view' ).click()
                cy.contains( 'Remove' ).click()
                cy.get( 'html' ).should( 'not.contain', blogs[0].title )
            } )

            it( 'a blog can\'t be removed by other users', function () {
                cy.contains( 'Logout' ).click()
                cy.contains( 'view' ).click()
                cy.contains( 'Remove' ).click()

                cy.get( '.error' ).should( 'contain', 'There was an error removing your blog.' )
                cy.get( 'html' ).should( 'contain', blogs[0].title )
            } )

            it( 'blogs are ordered by likes', function () {
                cy.get( '.blog' ).eq( 0 ).should( 'contain', blogs[0].title )
                cy.get( '.blog' ).eq( 1 ).should( 'contain', blogs[1].title )
                cy.get( '.blog' ).eq( 2 ).should( 'contain', blogs[2].title )
            } )
        } )
    } )
} )

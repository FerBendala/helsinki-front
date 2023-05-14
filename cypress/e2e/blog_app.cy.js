describe( 'Note app', function () {
    it( 'front page can be opened', function () {
        cy.visit( 'http://localhost:3000' )
        cy.contains( 'Blogs' )
        cy.contains( 'Blog app, Department of My Nuts, University of Helsinki 2023' )
    } )
} )
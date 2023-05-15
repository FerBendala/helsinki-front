const { defineConfig } = require( "cypress" );

module.exports = defineConfig( {
    env: {
        BASE_URL: "http://localhost:3000",
        BACKEND: "http://localhost:3001/api",
    },

    e2e: {
        setupNodeEvents( on, config ) {
            // implement node event listeners here
        },
    },
} );

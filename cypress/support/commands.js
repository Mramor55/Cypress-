// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.Commands.add('api', (method, url, options = {}) => {
  // Build the request object
  const requestOptions = {
    method: method, // HTTP method (GET, POST, PUT, DELETE, etc.)
    url: url,       // API endpoint
    ...options      // Additional options (headers, body, query params, etc.)
  }});

  // Execute the request and return the response
//   return cy.request(requestOptions).then((response) => {
//     // Log the request and response for debugging purposes
//     Cypress.log({
//       name: 'API Request',
//       message: `${method} ${url}`,
//       consoleProps: () => ({
//         Request: requestOptions,
//         Response: response,
//       }),
//     });

//     // Return the response to the test
//     return response;
//   });
// });
// // -- This is a parent command --
Cypress.on('uncaught:exception', (err, runnable) => {

  return false;
})


//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
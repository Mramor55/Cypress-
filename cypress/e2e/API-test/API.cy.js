describe("Deck of Cards API Automation", () => {
  let deckId;

  it("Should check two players for blackjack", () => {
    // 1. Navigate to https://deckofcardsapi.com/
    cy.request("GET", "/").then((response) => {
      //2. Confirm the site is up
      expect(response.status).to.equal(200);
    });

    //Create a new deck
    cy.request("GET", "/api/deck/new/").then((response) => {
      expect(response.status).to.eq(200);
      deckId = response.body.deck_id;

      //Shuffle the new deck
      cy.request("GET", `/api/deck/${deckId}/shuffle/?deck_count=1`).then(
        (shuffleResponse) => {
          expect(shuffleResponse.status).to.equal(200);

          //Draw 6 cards from the shuffled deck
          cy.request(`GET`, `/api/deck/${deckId}/draw/?count=6`).then(
            (drawResponse) => {
              //Grab card values and assign 3 card to reach player
              const cards = drawResponse.body.cards.map((card) => card.value);
              const player1Cards = cards.slice(0, 3);
              const player2Cards = cards.slice(3);

              //Check for blackjack conditions and write out the result
              const player1HasBlackjack = checkForBlackjack(player1Cards);
              const player2HasBlackjack = checkForBlackjack(player2Cards);

              if (player1HasBlackjack) cy.log("Player 1 has blackjack!");
              if (player2HasBlackjack) cy.log("Player 2 has blackjack!");
            }
          );
        }
      );
    });
  });
});

function checkForBlackjack(cards) {
  // Implement your logic to check for blackjack based on player cards
  // Return true if blackjack, false otherwise
  // Example: Check if cards include an Ace and a 10, Jack, Queen, or King
  return (
    cards.includes("ACE") &&
    (cards.includes("10") ||
      cards.includes("JACK") ||
      cards.includes("QUEEN") ||
      cards.includes("KING"))
  );
}

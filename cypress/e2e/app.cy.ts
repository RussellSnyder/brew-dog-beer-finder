import { BEER_PAIRINGS_CONTAINER_SELECTOR, INPUT_SELECTOR } from "../selectors";

describe("Navigation", () => {
  it("should navigate to 'All Beers' page", () => {
    cy.visit("http://localhost:3000/");

    cy.get('nav a[href*="all-beers"]').click();

    cy.url().should("include", "/all-beers");
    cy.get("h1").contains("All Beers");
  });
  it("should navigate to 'Food Pairings' page", () => {
    cy.visit("http://localhost:3000/all-beers");

    cy.get("nav a").contains("Food Pairings").click();
    cy.url().should("equal", "http://localhost:3000/");

    cy.get("h1").contains("Beer Pairings");
  });
  it("should navigate to home page on logo click", () => {
    cy.visit("http://localhost:3000/all-beers");

    cy.get("nav a").contains("Brew Dog Beer Finder").click();
    cy.url().should("equal", "http://localhost:3000/");

    cy.get("h1").contains("Beer Pairings");
  });
});

describe("Finding a beer to go with 'beef'", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(INPUT_SELECTOR).type("beef");
  });

  it("should display beers for input 'beef'", () => {
    cy.get(BEER_PAIRINGS_CONTAINER_SELECTOR).should("contain.text", "beef");
  });

  describe("beer page visits from pairing finder", () => {
    for (let n = 1; n < 10; n++) {
      it(`should navigate to a the n(${n}) beer when CTA is clicked`, () => {
        cy.get(`${BEER_PAIRINGS_CONTAINER_SELECTOR} > div:nth-of-type(${n}) h2`)
          .invoke("text")
          .then((beerName) => {
            cy.get(
              `${BEER_PAIRINGS_CONTAINER_SELECTOR} > div:nth-of-type(${n}) a`
            ).click();

            cy.get("h1")
              .invoke("text")
              .should((h1) => {
                expect(h1).to.eq(beerName);
              });
          });
      });
    }
  });
});

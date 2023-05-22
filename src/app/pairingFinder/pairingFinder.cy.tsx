import {
  BEER_PAIRINGS_CONTAINER_SELECTOR,
  EMPTY_STATE_SELECTOR,
  INITIAL_SELECTOR,
  INPUT_SELECTOR,
  LOADING_SELECTOR,
} from "../../../cypress/selectors";
import { PairingFinder } from "./pairingFinder";

describe("PairingFinder", () => {
  beforeEach(() => {
    cy.mount(<PairingFinder />);
  });

  it("should have an input of type text", () => {
    cy.mount(<PairingFinder />);
    cy.get(INPUT_SELECTOR).should("have.attr", "type", "text");
  });

  describe("input tests", () => {
    it("should show loading state while typing", () => {
      cy.get(INPUT_SELECTOR).type("chicken");
      cy.get(LOADING_SELECTOR).should("be.visible");
    });
    it("should show beer container for a matching query", () => {
      cy.get(INPUT_SELECTOR).type("chicken");
      cy.get(BEER_PAIRINGS_CONTAINER_SELECTOR).should("be.visible");
    });
    it("should show beers for a matching query", () => {
      cy.get(INPUT_SELECTOR).type("chicken");
      cy.get(BEER_PAIRINGS_CONTAINER_SELECTOR).should("contain.text", "Buzz");
    });
    describe("empty state", () => {
      beforeEach(() => {
        cy.get(INPUT_SELECTOR).type("chickenasdkfjahshdfa");
      });
      it("should show empty state for a non-matching query", () => {
        cy.get(BEER_PAIRINGS_CONTAINER_SELECTOR).should("not.exist");
        cy.get(EMPTY_STATE_SELECTOR).should("exist");
      });
      it("should clear input and return to initial state when reset is clicked", () => {
        cy.get("button").click();
        cy.get(INPUT_SELECTOR).should("contain.value", "");
        cy.get(INITIAL_SELECTOR).should("exist");
      });
    });
  });
});

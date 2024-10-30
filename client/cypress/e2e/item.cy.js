///<reference types='cypress'/>
describe("Landing Page Tests", function () {
  beforeEach("load site", function () {
    cy.fixture("data").then(function (data) {
      this.data = data;
    });
    cy.visit("http://localhost:3000");
  });

  it("should open the sign-in modal", function () {
    cy.get("#btn_sign_in_modal").click({ force: true });
    cy.get("#sign_in_modal").should("be.visible");
    cy.get("#btn_sign_in_modal_close").click({ force: true });
    cy.get("#sign_in_modal").should("not.be.visible");
  });

  it("should submit the sign-in form successfully", function () {
    cy.get("#btn_sign_in_modal").click({ force: true });
    cy.get("#sign_in_modal").should("be.visible");
    cy.get("#email").type(this.data.email);
    cy.get("#password").type("pugadmaharlika123");
    cy.get("#btn_login").click({ force: true });
  });

  it("should open Item", function () {
    cy.get("#btn_sign_in_modal").click({ force: true });
    cy.get("#sign_in_modal").should("be.visible");
    cy.get("#email").type(this.data.email);
    cy.get("#password").type("pugadmaharlika123");
    cy.get("#btn_login").click({ force: true });
    cy.get("#btn_drawer_Items").should("be.visible");
    cy.get("#btn_drawer_Items").click({ force: true });
    cy.get("#btn_add_item").should("be.visible");
    cy.get("#btn_add_item").click({ force: true });
    cy.get("#btn_back").should("be.visible");
    cy.get("#btn_back").click({ force: true });
    cy.get("#btn_update").should("be.visible");
    cy.get("#btn_update").click({ force: true });
    cy.get("#btn_update_back_item").should("be.visible");
    cy.get("#btn_update_back_item").click({ force: true });
    cy.get("#btn_item_details").should("be.visible");
    cy.get("#btn_item_details").click({ force: true });
    cy.get("#btn_back_item_details").should("be.visible");
    cy.get("#btn_back_item_details").click({ force: true });
  });
});

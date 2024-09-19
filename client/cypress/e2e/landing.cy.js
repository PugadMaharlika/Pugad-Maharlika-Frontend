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

  it("should open the sign-up modal", function () {
    cy.get("#btn_sign_in_modal").click({ force: true });
    cy.get("#btn_sign_up_modal").click({ force: true });
    cy.get("#sign_up_modal").should("be.visible");
    cy.get("#btn_sign_up_modal_close").click({ force: true });
    cy.get("#sign_up_modal").should("not.be.visible");
  });

  it("should open the forgot-password modal", function () {
    cy.get("#btn_sign_in_modal").click({ force: true });
    cy.get("#btn_forget_password_modal").click({ force: true });
    cy.get("#forget_password_modal").should("be.visible");
    cy.get("#forget_password_modal_close").click({ force: true });
    cy.get("#forget_password_modal").should("not.be.visible");
  });

  it("should submit the sign-in form successfully", function () {
    cy.get("#btn_sign_in_modal").click({ force: true });
    cy.get("#sign_in_modal").should("be.visible");
    cy.get("#email").type(this.data.email);
    cy.get("#password").type("password");
    cy.get("#btn_login").click({ force: true });
  });
});

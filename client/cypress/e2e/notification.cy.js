///<reference types='cypress'/>
describe("Notification Test", function () {
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

  it("should open Notification", function () {
    cy.get("#btn_sign_in_modal").click({ force: true });
    cy.get("#sign_in_modal").should("be.visible");
    cy.get("#email").type(this.data.email);
    cy.get("#password").type("pugadmaharlika123");
    cy.get("#btn_login").click({ force: true });
    cy.get("#btn_drawer_Notification").should("be.visible");
    cy.get("#btn_drawer_Notification").click({ force: true });
    cy.get("#btn_AddNotification").should("be.visible");
    cy.get("#btn_AddNotification").click({ force: true });
    cy.get("#btn_back_AddNotification").should("be.visible");
    cy.get("#btn_back_AddNotification").click({ force: true });
    cy.get("#btn_Notification_action").should("be.visible");
    cy.get("#btn_Notification_action").click({ force: true });
    cy.get("#btn_EditNotification").should("be.visible");
    cy.get("#btn_EditNotification").click({ force: true });
    cy.get("#btn_back_EditNotification").should("be.visible");
    cy.get("#btn_back_EditNotification").click({ force: true });
  });
});

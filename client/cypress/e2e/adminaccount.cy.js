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
    it("should open AdminManagement", function () {
      cy.get("#btn_sign_in_modal").click({ force: true });
      cy.get("#sign_in_modal").should("be.visible");
      cy.get("#email").type(this.data.email);
      cy.get("#password").type("pugadmaharlika123");
      cy.get("#btn_login").click({ force: true });
      cy.get("#btn_drawer_Admin").should("be.visible");
      cy.get("#btn_drawer_Admin").click({ force: true });
    });
    it("should open AddAdminAccount", function () {
      cy.get("#btn_sign_in_modal").click({ force: true });
      cy.get("#sign_in_modal").should("be.visible");
      cy.get("#email").type(this.data.email);
      cy.get("#password").type("pugadmaharlika123");
      cy.get("#btn_login").click({ force: true });
      cy.get("#btn_drawer_Admin").should("be.visible");
      cy.get("#btn_drawer_Admin").click({ force: true });
      cy.get("#add-account").should("be.visible"); 
      cy.get("#add-account").click({ force: true }); 
    });
    it("should open AdminAccount", function () {
        cy.get("#btn_sign_in_modal").click({ force: true });
        cy.get("#sign_in_modal").should("be.visible");
        cy.get("#email").type(this.data.email);
        cy.get("#password").type("pugadmaharlika123");
        cy.get("#btn_login").click({ force: true });
        cy.get("#btn_drawer_Admin").should("be.visible");
        cy.get("#btn_drawer_Admin").click({ force: true });
      
        cy.get("tbody tr").first().find(".account-info").should("be.visible").click({ force: true });
      });
      
      
  });
  
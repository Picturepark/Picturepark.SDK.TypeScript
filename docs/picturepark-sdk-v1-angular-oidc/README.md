# Picturepark Content Platform TypeScript SDK: Angular OIDC Authentication

## picturepark-sdk-v1-angular-oidc

Dependencies: 

- @angular/*
- @picturepark/picturepark-sdk-v1-angular
- [oidc-client](https://www.npmjs.com/package/oidc-client)

Contains the `OidcAuthService` class, an Open ID Connect implementation of [AuthService](../picturepark-sdk-v1-angular/AuthService.md).

## OidcAuthService

Extends [AuthService](../picturepark-sdk-v1-angular/AuthService.md)

**Additional methods:** 

- login(redirectRoute?)
- logout(redirectRoute?)

Both methods redirect the user to the external Identity Server which authenticates the user and redirects the user back to the specified route of the application. 

**Additional properties:** 

- username

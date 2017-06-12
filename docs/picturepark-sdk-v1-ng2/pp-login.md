# pp-login

**NPM Package:** @picturepark/sdk-v1-angular-ui

Renders a login screen to authenticate with the Picturepark server. The component is only rendered if the user is not logged in.

TODO: Add image

Usage:

    <pp-login rememberPassword="true" (loggedIn)="onLoggedIn()"></pp-login>

Properties:

- **username (optional):** Defines the initial username
- **password (optional):** Defines the initial password
- **rememberPassword (optional, default: false):** Defines the initial state of the "Remember Password" check box
- **canRememberPassword (optional, default: true):** Defines whether the user can save the password in local storage (i.e. whether the "Remember Password" check box is rendered)

Events:

- loggedIn: Event which is emitted when the user successfully logged in
- loggedOut: Event which is emitted when the user logged out

See also: [pp-logout](pp-logout.md)
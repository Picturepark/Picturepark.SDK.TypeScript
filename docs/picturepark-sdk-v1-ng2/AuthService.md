# AuthService

**NPM Package:** picturepark-sdk-v1-ng2

A client which provides methods to authenticate/login and logout a user from the Picturepark server.

Methods:

- login(username, password, saveCredentials)
- logout()

Properties:

- isLoggedIn: A value indicating whether the user is logged in
- username: The username of the currently logged in user

Events:

- isLoggedInChange: Event which triggers when `isLoggedIn` has changed
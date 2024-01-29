# Login module with NestJS

### This is an example of a full login system module made wih NestJS, using it's own modules for database management, environmen variables, authentication, etc.

 It implements
  - User model for managing users in your system (TypeOrm)
  - Double authentication made with Passport and Nest, one for local checking your database and another to check for JWTs
  -  **The model can be extended as well the strategies to validate a user**
  -  It can use any database engine compatible with TypeOrm you just change it in the configDb function called in the App.Module

# IMPORTANT you need a .env file with the next information

- **DB_NAME**= Name of the database
- **DB_HOST**= localhost / your_host
- **DB_PORT**= Database port
- **DB_USER**= Database user
- **DB_PASS**= Database user's password
- **HASH_SEED**= Random int number to create the hashed passwords **ONCE YOU USE IT, NEVER CHANGE IT OR YOU CAN HAVE PROBLEMS AUTHENTICATING USERS**
- **JWT_KEY**= A random string that you need to establish as a secret chain characters to build the JWTs, **NEVER CHANGE IT ONCE YOU USE IT**

# nodejs-express-backend-setup
An easy setup for any node-js back-end build with express.


# What is nodejs-express-backend-setup
nodejs-express-backend-setup is created to be used as an easy-to-use nodejs back-end template. It will help you create your back-end-projects faster.


# What does nodejs-express-backend-setup contain
nodejs-express-backend-setup is a back-end template that contains all kind off logic, models, and routers to easily setup your backend.

At this moment nodejs-express-backend-setup used the following:
 - Mongoose DB logic (https://github.com/Automattic/mongoose)
    * Used to connect to a Mongo DB and interact with data
    
 - Express http server logic (https://github.com/expressjs/express)
    * Used to spin up a http server using routes
    * This template supports easily adding of routes
    * The Express server runs on the specified port in the already supplied .env file (This to support hosting with for example Heroku), if no port is specified it will default to port 3000.
    
 - Bcrypt hash logic (https://github.com/kelektiv/node.bcrypt.js/)
    * Used to generate secure salts (to prevent rainbow attacks)
    * Used to hash passwords using the generated salts
    * cost factor 5 (2^5 = 32)
    
- Nodemailer mail logic(https://github.com/nodemailer/nodemailer)
    * Used to send emails (Email verification)
    * Supports both plain text emails as HTML emails.
    
- Joi and Joi-password-complexity validating logic(https://github.com/sideway/joi & https://github.com/kamronbatman/joi-password-complexity)
    * Used to perform complex validation methods on model data
    * Password complexity is used to add some extra validating for passwords upon joi.
    
- Dotenv (https://github.com/motdotla/dotenv)
    * Used to add global and static environment variables
    * Thanks to dotenv in combination with the non static port used in the server.js; your app is ready to be hosted on for example Heroku.
    
- Nodemon (https://github.com/remy/nodemon) DEV
    * Used to easily run your code in realtime (watcher).
    * This is a dev package, and is therefor not recommended to be used in a deployement build
   
# FEATURES
- Registering users
  * Supports to be fully customized
  * Supports email verification
  
UPCOMMING:
- Login
- Phone verification
- And much more.
    
    

    

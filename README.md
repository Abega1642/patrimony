## Wealth management application

This is an applicatoin of `Gestion de patrimoine` [`Wealth management`].

This application is a `MVC` architecture.

In next paragraphs, you can find some information about the main structure of the application and some notices on how to launch each server.

### Frontend : REACT JS

The react server will be found in the directory named `ui`. It's running on the port `5173`.[`http://localhost:5173`]

To launch the server, you should go in the `ui` directory. 
    
    ┌─[user@host] - [~/.../patrimony] - [6126]
    └─[$]  cd ui

Then run this following command line :

    ┌─[user@host] - [~/.../patrimony/ui] - [6126]
    └─[$]  npm run dev

and then go to the given link as I mentionned abouve.

### BackEnd : EXPRESS JS

The express server will be found in the directory named `backend`. It's running on the port `8080`. [`http://localhost:8080].

To launch the server, you should go in the `backend/controller` directory :

    ┌─[user@host] - [~/.../patrimony] - [6126]
    └─[$]  cd backend/controller


then you can run the `server.js` file to run the express js backend server :

    ┌─[user@host] - [~/.../patrimony/backend/controller] - [6126]
    └─[$]  node server.js


## Warnings :

-   Make sure, whenever you run the react server, your current directory is in the `ui` directory or somewhere inside it.
-   Make sure, whenever you want to run the express server, your current directory is in `.../backend/controller`. When your current directory is as just mentionned, you can launch the server.





# CrocodileGame
Welcome to the main repository to of _CrocodileGame Project_.

## How to run
### _Installation_
This project is build with C# and [ASP.NET](https://dotnet.microsoft.com/download), so you need to install both these things.

Also, this project uses [Node.js and npm](https://nodejs.org/en/). You have to install this too.
After that, you ought to open your terminal in project folder and write these commands in console. After this, all dependencies will be installed.
```sh
cd client
npm install
```
### _Start_
To start the server, you need to open command line in project directory. Then write
```sh
dotnet run --project ./server/CrocodileGame/CrocodileGame.csproj
```
The server will be started in port 5050 (make sure there's nothing working on this port).
To run a client side, you need to write this command in other console
```sh
cd client
npm start
```
Your browser will be opened in localhost:8080.

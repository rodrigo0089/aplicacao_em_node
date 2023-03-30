require("express-async-errors");

const migrationRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");

//por padrão sempre carrega o arquivo index.js
const express = require("express");
const routes = require("./routes")

migrationRun();

const app = express();
app.use(express.json());

app.use(routes);


app.use((error, request, response, next) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Sever is running on Port ${PORT}`))
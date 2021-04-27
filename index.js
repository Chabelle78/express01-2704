const { response } = require("express");
const express = require("express");

const app = express();

// Array of movies
const movies = require("./movies");
// In codesandbox we need to use the default port which is 8080

// app.get("/api/movies/:id", (request, response) => {
//   const idMovie = movies.find((item) => {
//     return item.id === +request.params.id;
//   });
//   if (idMovie) {
//     response.status(200).json(idMovie);
//   } else {
//     response.status(404).send("Not found");
//   }
// });

app.get("/api/movies/:id", (request, response) => {
  const idMovie = movies.find((item) => {
    return item.id === +request.params.id;
  });
  idMovie
    ? response.status(200).json(idMovie)
    : response.status(404).send("Not found");
});

app.get("/api/search", (request, response) => {
  const maxduration = [];
  const search = movies.filter((item) => {
    return item.duration <= `${request.query.maxDuration}`;
  });
  maxduration.push(search)
    ? response.status(200).json(search)
    : response.status(404).send("No movies found for this duration");
});

app.get("/api/users", (request, response) => {
  response.status(401).send("Unhautorized");
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

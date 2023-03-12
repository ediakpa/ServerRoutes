import http from "http";
import fetch from "node-fetch";
import { createDeflateRaw } from "zlib";

const server = http
  .createServer((req, res) => {
    const url = req.url;
    let tableData =
      "<table border='1'><tr><th>Name</th><th>Height</th><th>Mass</th><th>Birth Year</th><th>Gender</th><th>URL</th></tr>";
    if (url === "/") {
      res.write("<h1>Welcome!</h1>");
      res.end(
        "<img src='https://dummyimage.com/600x400/d90fd9/e8bee0&text=Hi+!'>"
      );
    }

    if (url === "/list") {
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          //   console.log(data.results);
          createData(data.results);
          //   data.results instead of data since the results is the array
          res.write(tableData);
          res.end();
        });
    }

    else {
        res.end("Page Not Found");
    }

    function createData(data) {
      data.forEach((element) => {
        tableData += `<tr><td>${element.name}</td><td>${element.height}</td><td>${element.mass}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td></tr>`;
      });
      tableData += "</table>";
    }
  })
  .listen(8020, console.log(`Server listening on port 8020`));

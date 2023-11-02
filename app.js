const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  function serverErrorLog() { //서버 오류 로그를 확인하기 위한 func 생성

    res.writeHead(500);
    return res.end("서버의서 문제가 발생하였습니다.");
  }
  //url은 get 방식의 대표적인 방식(get : data + url)
  console.log("요청 확인 : " + req.url + " / req의 메소드 확인 : ", req.method);
  //1. 요청 url
  //2. 요청 메서드

  if (req.url === "/" && req.method === "GET") {
    fs.readFile("./index.html", "utf8", (err, data) => {
      if (err) {
        serverErrorLog();
      }
      res.writeHead(200, { "Countent-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url === "./style.css" && req.method === "GET") {
    fs.readFile("./style.css", "utf8", (err, data) => {
      if (err) {
        serverErrorLog();
      }
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  } else {
    res.writeHead(484);
    res.end("Not Found");
  }
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`cli 창에서 컨트롤 누르고 포트 누르면 확인 http://localhost:${PORT}/`);
 });
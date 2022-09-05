const fs = require("fs");
const http = require("http");
const url = require("url");

// fs.readFile("./txt/start.txt", { encoding: "utf-8" }, (err1, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, { encoding: "utf-8" }, (err2, data2) => {
//         fs.readFile(
//             "./txt/append.txt",
//             { encoding: "utf-8" },
//             (err3, data3) => {
//                 fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, (err) => {
//                     if (err) console.log("err");
//                     else console.log("written into file");
//                 });
//             }
//         );
//     });
// });

const productData = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(productData);

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === "/overview" || pathName === "/") {
        res.end("Overview Page");
    } else if (pathName === "/product") {
        res.end("Product Page");
    } else if (pathName === "/api") {
        res.writeHead(200, "OK", {
            "Content-type": "application/json",
        });
        res.end(productData);
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
        });
        res.end(
            "<body bgcolor='black'><h1 style='color: white; text-align: center'>Page doesn't exist</h1></body>"
        );
    }
});

server.listen(8000, "127.0.0.1", () =>
    console.log("listening to request on port:8000")
);

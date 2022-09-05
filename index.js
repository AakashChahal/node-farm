const fs = require("fs");
const http = require("http");

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

const server = http.createServer((req, res) => {
    res.end("response from server");
});

server.listen(8000, "127.0.0.1", () =>
    console.log("listening to request on port:8000")
);

import { readFileSync } from "fs";
import { createServer } from "http";
import { parse } from "url";

import slugify from "slugify";

import replaceTemplate from "./modules/replaceTemplate.js";

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

const productData = readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(productData);

// const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
// console.log(slugs);

const overviewTemp = readFileSync(
    "./templates/template-overview.html",
    "utf-8"
);
const productTemp = readFileSync("./templates/template-product.html", "utf-8");
const cardTemp = readFileSync("./templates/template-card.html", "utf-8");

const server = createServer((req, res) => {
    const { query, pathname: pathName } = parse(req.url);

    if (pathName === "/overview" || pathName === "/") {
        res.writeHead(200, {
            "Content-type": "text/html",
        });

        const cardsHtml = dataObj
            .map((el) => replaceTemplate(cardTemp, el))
            .join("");

        const overviewPage = overviewTemp.replace(
            "{%PRODUCT_CARDS%}",
            cardsHtml
        );

        res.end(overviewPage);
    } else if (pathName === "/product") {
        const product = dataObj[query.split("=")[1]];
        res.writeHead(200, {
            "Content-type": "text/html",
        });
        const productPage = replaceTemplate(productTemp, product);
        res.end(productPage);
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

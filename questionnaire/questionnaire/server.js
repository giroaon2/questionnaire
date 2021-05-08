'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var formidable = require('formidable');
var fs = require('fs');
 
function onRequest(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (req.url == '/submit') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            console.log(fields.FirstName);
            loadPage('./submit.html', res);
        });
    } else {
        loadPage('./index.html', res);
    }
}
http.createServer(onRequest).listen(port);

function loadPage(page, res) {
    fs.readFile(page, null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.writeHead('File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
}
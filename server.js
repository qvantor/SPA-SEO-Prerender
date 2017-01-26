var express = require('express');
var webdriverio = require('webdriverio');

var app = express();

app.get('*', function (req, res) {
    webdriverio
        .remote({
            desiredCapabilities: {
                browserName: 'phantomjs'
            }
        })
        .init()
        .url(req.params[0].slice(1))
        .getHTML('html')
        .then(function (html) {
            html = html.replace(/<script.+<\/script>/g, '');
            res.send(html);
        }).end();
});

app.listen(5000, function () {
    console.log('listening on port 5000');
});
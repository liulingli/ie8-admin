const express = require('express');
const proxy = require('express-http-proxy');

const port = 8088;
const app = express();

//代理API
const apiProxy = proxy("115.29.239.213:18733", {
    forwardPath: function (req, res) {
        return req._parsedUrl.path
    }
});
app.use("/api", apiProxy);
app.use('/', express.static('./'));

app.listen(port, function () {
    console.log("Listening on port: " + port);
});
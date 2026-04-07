const http = require("http");
const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 8080);

const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ogg": "audio/ogg",
    ".wav": "audio/wav",
    ".ico": "image/x-icon",
    ".txt": "text/plain; charset=utf-8"
};

function sendNotFound(res) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("404 Not Found");
}

function sendServerError(res) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("500 Internal Server Error");
}

const server = http.createServer((req, res) => {
    const safeUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const requestedPath = decodeURIComponent(safeUrl.pathname);
    const normalizedPath = path.normalize(requestedPath).replace(/^([.][.][/\\])+/, "");

    let filePath = path.join(rootDir, normalizedPath);
    if (requestedPath === "/") {
        filePath = path.join(rootDir, "index.html");
    }

    if (!filePath.startsWith(rootDir)) {
        sendNotFound(res);
        return;
    }

    fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
            sendNotFound(res);
            return;
        }

        if (stats.isDirectory()) {
            const indexPath = path.join(filePath, "index.html");
            fs.stat(indexPath, (indexErr, indexStats) => {
                if (indexErr || !indexStats.isFile()) {
                    sendNotFound(res);
                    return;
                }

                const ext = path.extname(indexPath).toLowerCase();
                res.statusCode = 200;
                res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
                fs.createReadStream(indexPath)
                    .on("error", () => sendServerError(res))
                    .pipe(res);
            });
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        res.statusCode = 200;
        res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
        fs.createReadStream(filePath)
            .on("error", () => sendServerError(res))
            .pipe(res);
    });
});

server.listen(port, host, () => {
    console.log(`CrappyBird server running at http://${host}:${port}`);
});

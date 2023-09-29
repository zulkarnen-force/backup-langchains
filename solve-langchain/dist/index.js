import express from "express";
import path from "path";
const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
console.log(__dirname);
app.use(express.static(path.join(__dirname, "../ui", "build")));
app.get("/api", (req, res) => {
    res.send("Hello, world!");
});
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../ui", "build", "index.html"));
});
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
//# sourceMappingURL=index.js.map
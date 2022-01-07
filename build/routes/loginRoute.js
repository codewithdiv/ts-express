"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        return next();
    }
    res.status(403);
    res.send(`Whoops! you are not logged in`);
}
router.get("/login", (req, res, next) => {
    res.send(`
    <div>
      <form method="post" action"">
        <div>
            <label>Email</label>
            <input type="email" name="email" />
        </div>
        <div>
            <label>Password</label>
            <input type="password" name="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  `);
});
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email &&
        password &&
        email === "test@test.com" &&
        password === "test@1234") {
        req.session = { loggedIn: true };
        res.redirect("/");
    }
    else {
        res.send(`Please enter a valid email address and a password`);
    }
});
router.get("/", (req, res, next) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
      <div>
        <h1>You are logged in</h1>
        <a href="/logout">Logout</a>
      </div>
    `);
    }
    else {
        res.send(`
      <div>
        <h1>You are not logged in</h1>
        <a href="/login">Login</a>
      </div>
    `);
    }
});
router.get("/logout", (req, res) => {
    req.session = undefined;
    res.redirect("/");
});
router.get("/protected", requireAuth, (req, res) => {
    res.send(`This is a protected endpoit`);
});

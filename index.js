const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db.js");
// const bc = require("./utils/bc");
const { hash } = require("./utils/bc");
// const cookieSession = require("cookie-session");
// const csurf = require("csurf");

app.use(compression());
// app.use(express.static("./public"));  How can I render an img with commenting that out???

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
// app.use(csurf());

// app.use(function(req, res, next) {
//     res.setHeader("X-Frame-Options", "DENY");
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

app.use((req, res, next) => {
    console.log("The route is: ", req.url);
    next();
});

app.use(express.static("./public"));
app.use(express.json()); // if orgot only that and I couldn't redirect!!!

app.get("/", function(req, res) {
    res.redirect("/welcome");
}); //redirect route

// app.get("/registration", function(req, res) {
//     // console.log(req.session);
//     res.render("registration", {
//         // layout: "main"
//     });
// });

app.post("/welcome", (req, res) => {
    // console.log(" you registered to the route");
    console.log("body in the registered form: ", req.body);
    if (req.body.password == "") {
        res.render("welcome");
    } else {
        hash(req.body.password)
            .then(hash => {
                console.log("hashed text is: ", hash);
                db.getUsers(req.body.first, req.body.last, req.body.email, hash)
                    .then(result => {
                        // req.session.userId = id;
                        res.json(result); // if i have only that then the following route is / logo
                        // res.redirect("/welcome"); // if i just have res.redirect then after the hashed text the route is / welcome  and after / logo
                    })
                    .catch(err => {
                        console.log(" The error in post registration is:", err);
                        // res.render("welcome");
                        res.json(err);
                    });
            })
            .catch(e => console.log(e));
    }
});

//This route needs to  be last
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});

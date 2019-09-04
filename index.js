const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db.js");
// const bc = require("./utils/bc");
const { hash, compare } = require("./utils/bc");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

app.use(compression());

app.use(express.json()); // i   forgot only that and I couldn't redirect!!!

app.use(express.static("./public")); //How can I render an img with commenting that out???

app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24 * 365.25 * 1000,
        secret:
            process.env.NODE_ENV == "production"
                ? process.env.SESS_SECRET
                : require("./secrets").sessionSecret
    })
);

app.use(csurf());
//
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

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

app.get("/", function(req, res) {
    res.redirect("/welcome");
}); //redirect route

// app.get("/welcome", function(req, res) {
//     // console.log(req.session);
//     res.render("register", {
//         layout: "main"
//     });
// });
app.post("/register", (req, res) => {
    // console.log(" you registered to the route");
    console.log("body in the post register/: ", req.body);
    if (req.body.password == "") {
        res.json({
            success: false,
            error: "error"
        });
        // res.render("welcome");
    } else {
        hash(req.body.password)
            .then(hash => {
                console.log("hashed text is: ", hash);
                db.addUsers(req.body.first, req.body.last, req.body.email, hash)
                    .then(result => {
                        console.log(result);
                        // req.session.userId = id;
                        res.json({
                            success: false,
                            error: "error"
                        }); // if i have only that then the following route is / logo
                        // res.redirect("/welcome"); // if i just have res.redirect then after the hashed text the route is / welcome  and after / logo
                    })
                    .catch(err => {
                        console.log(" The error in post registration is:", err);
                        // res.render("welcome");
                        res.json({
                            success: false,
                            error: "error"
                        });
                    });
            })
            .catch(e => console.log(e));
    }
});

app.post("/login", (req, res) => {
    db.getHashedpassword(req.body.email)
        .then(result => {
            compare(req.body.password, result[0].password)
                .then(match => {
                    if (match) {
                        req.session.userId = result[0].id;
                        req.session.loggedIn = true;
                        res.json({
                            success: true
                        });
                    } else {
                        res.json({
                            success: false
                        });
                    }
                    console.log(match);
                })
                .catch(e => {
                    console.log(e);
                    res.json({
                        success: false
                    });
                });
        })
        .catch(e => {
            console.log("The error in login post", e);
            res.json({
                success: false
            });
        });
});

//This route needs to  be last
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});

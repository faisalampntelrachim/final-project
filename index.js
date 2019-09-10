const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db.js");
// const bc = require("./utils/bc");
const { hash, compare } = require("./utils/bc");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

const s3 = require("./s3");
const config = require("./config");

//////FILE UPLOAD BOILERPLATE//////
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

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
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
}); //redirect route
app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
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
                    .then(id => {
                        console.log(id);
                        req.session.userId = id;
                        res.json({
                            success: true // This must be true since all of the required fields exist
                        }); // if i have only that then the following route is / logo
                        // res.redirect("/welcome"); // if i just have res.redirect then after the hashed text the route is / welcome  and after / logo
                    })
                    .catch(err => {
                        console.log(" The error in post registration is:", err);
                        // res.render("welcome");
                        res.json({
                            success: false
                            // error: "error"
                        });
                    });
            })
            .catch(e => {
                console.log(e);
                res.json({
                    success: false,
                    error: "error"
                });
            });
    }
});

app.post("/login", (req, res) => {
    db.getHashedpassword(req.body.email)
        .then(result => {
            compare(req.body.password, result[0].password)
                .then(match => {
                    if (match) {
                        console.log(req.session.userId);
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

app.get("/user", (req, res) => {
    db.addUsersInfo(req.session.userId)
        .then(resp => {
            res.json(resp);
        })
        .catch(e => {
            console.log("The err in get users is:", e);
        });
});

app.get("/users/:id", (req, res) => {
    console.log("The req params is:", req.params.id);
    db.addUsersInfo(req.params.id)
        .then(resp => {
            console.log("The resp in app.get users/:id is:", resp.data);
            res.json(resp);
        })
        .catch(e => {
            console.log("The err in get users is:", e);
        });
});
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    const imageurl = config.s3Url + filename;
    // const { first, last } = req.body;
    console.log("the image url is:", imageurl);
    if (req.file) {
        console.log("The req.file is:", req.file);
    }
    db.addUsersUpdate(req.session.userId, imageurl)
        .then(result => {
            console.log("The new image is:", result);
            // url.unshift();
            res.json({
                image: imageurl
            });
        })

        .catch(err => {
            console.log("The error in post upload is", err);
        });
});

app.post("/bio", (req, res) => {
    console.log(
        "The req.session.userId body",
        req.session.userId,
        req.body.newbio
    );
    db.addUsersBio(req.session.userId, req.body.newbio)
        .then(result => {
            console.log("The result in bio app post is:", result);
            res.json(result);
        })
        .catch(e => {
            console.log("The error in /bio post", e);
        });
});

// app.get("/findusers/:search", (req, res) => {
//     console.log("The req params is:", req.params.search);
//     db.getMatchingUsers(req.params.search)
//         .then(resp => {
//             console.log("The resp in app.get users/:id is:", resp.data);
//             res.json(resp);
//         })
//         .catch(e => {
//             console.log("The err in get users is:", e);
//         });
// });

app.get("/findusers", (req, res) => {
    console.log("The req params is:", req.params.search);
    db.getSomeUsers(req.params.search)
        .then(resp => {
            console.log("The resp in app.get findusers/:id is:", resp.data);
            console.log("resp:", resp);
            res.json(resp);
        })
        .catch(e => {
            console.log("The err in get users is:", e);
        });
});
//This route needs to  be last
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});

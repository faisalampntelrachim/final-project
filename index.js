const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db.js");
// const server = require('http').Server(app);
// const io = require('socket.io')(server, { origins: 'localhost:8080' });
// const bc = require("./utils/bc");
const { hash, compare } = require("./utils/bc");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

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

// app.use(
//     cookieSession({
//         maxAge: 1000 * 60 * 60 * 24 * 365.25 * 1000,
//         secret:
//             process.env.NODE_ENV == "production"
//                 ? process.env.SESS_SECRET
//                 : require("./secrets").sessionSecret
//     })
// );

//for part 9
// const cookieSessionMiddleware = cookieSession({
//     maxAge: 1000 * 60 * 60 * 24 * 365.25 * 1000,
//    v
// });
// // maxAge: 1000 * 60 * 60 * 24 * 365.25 * 1000,
// process.env.NODE_ENV == "production"
//     ? process.env.SESS_SECRET
//     : require("./secrets").sessionSecret;
// io.use(function(socket, next) {
//     cookieSessionMiddleware(socket.request, socket.request.res, next);
// });

// const cookieSession = require('cookie-session');
console.log("made it here");
const cookieSessionMiddleware = cookieSession({
    secret:
        process.env.NODE_ENV == "production"
            ? process.env.SESS_SECRET
            : require("./secrets").sessionSecret,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
//////
// console.log(csurf);
app.use(csurf());
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
    // console.log("The req params is:", req.params.id);
    // if (req.params.id == req.session.userId)
    // db.addUsersInfo(req.params.id)
    db.addUsersInfo(req.params.id) //(req.params.id == 0)
        .then(resp => {
            // console.log("The resp[0].id", resp);
            if (req.params.id == 0) {
                res.json({ error: true });
            } else {
                // console.log("The resp in app.get users/:id is:", resp);
                res.json({
                    resp,
                    userId: req.session.userId
                });
            }
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

// to find 3 users
app.get("/findusers", (req, res) => {
    console.log("The req params is:", req.body);
    db.getSomeUsers(req.body)
        .then(resp => {
            console.log("The resp in app.get findusers is:", resp.data);
            console.log("resp:", resp);
            res.json(resp);
        })
        .catch(e => {
            console.log("The err in get findusers is:", e);
        });
});

app.get("/findusers/:search", (req, res) => {
    console.log("The req params is:", req.params.search);
    db.getMatchingUsers(req.params.search)
        .then(resp => {
            console.log("The resp in app.get findusers/:search is:", resp);
            res.json(resp.rows);
        })
        .catch(e => {
            console.log("The err in get users is:", e);
        });
});
//to check if there is a friendship between them
app.get("/addfriend/:id", (req, res) => {
    console.log("The app get /addfriend is:", req.params.id);
    db.getFriendships(req.params.id, req.session.userId) ///maybe req.session.userId
        .then(resp => {
            console.log("The resp in app.get /addfriend is:", resp);
            // if (resp.length == 0 || resp[0] === req.session.userId) {
            //     resp.length == 0 ||
            //     res.json({
            //         success: false
            //     });
            // } else {
            //     res.json(resp);
            // }
            res.json(resp);
            // console.log("resp:", resp);
        })
        .catch(e => {
            console.log("The err in app.get friendrequest is:", e);
        });
});

//for accept friend
app.post("/addfriend/:id", (req, res) => {
    console.log("The app.post /addfriend is:", req.params.id);
    db.addFriendships(req.params.id, req.session.userId)
        .then(resp => {
            console.log("The resp in app.post /addfriend is:", resp);
            console.log("resp:", resp);
            res.json(resp);
        })
        .catch(e => {
            console.log("The err in app.post addfriend is:", e);
        });
});
app.post("/acceptfriend/:id", (req, res) => {
    console.log("The app.post /acceptfriendfriend is:", req.params.id);
    db.acceptFriend(req.params.id, req.session.userId)
        .then(resp => {
            console.log("The resp in app.post/acceptfriend is:", resp);
            console.log("resp:", resp);
            res.json(resp);
        })
        .catch(e => {
            console.log("The err in app.post acceptfriend is:", e);
        });
});
app.post("/unfriend/:id", (req, res) => {
    console.log("The app.post /unfriend is:", req.params.id);
    db.deleteFriend(req.params.id, req.session.userId)
        .then(resp => {
            console.log("The resp in app.post/unfriend is:", resp);
            console.log("resp:", resp);
            res.json(resp);
        })
        .catch(e => {
            console.log("The err in app.post unfriend is:", e);
        });
});

//1 GET friends and finally not another 2 POST  below
app.get("/friends-wannabes", (req, res) => {
    console.log("GET/friends-wannabes is running");
    db.addFriendsList(req.session.userId) ///maybe req.session.userId
        .then(resp => {
            console.log("The resp in app.get /friends-wannabes is:", resp);
            res.json(resp);
            // console.log("resp:", resp);
        });
});

//for comments in reviews ///////////////////////////////
app.get("/reviews.json", (req, res) => {
    // console.log("comments get route");
    console.log("Server in get /reviews", res);
    db.getComments(req.session.userId).then(result => {
        console.log("Result of the get reviews getComments is: ", result);
        res.json(result);
    });
});

app.post("/reviews", (req, res) => {
    console.log("app post reviews", req.body);
    const { comment } = req.body;
    db.addComments(comment, req.session.userId)
        .then(result => {
            console.log("The result in post reviews", result);
            res.json(result);
        })
        .catch(err => {
            console.log("uploading comment error in reviews", err);
        });
});

/////////////////////////////////////////

////for tours field in the website//////
app.get("/tours.json", (req, res) => {
    // console.log("comments get route");
    console.log("Server in get /tours", res.data);
    db.getTours(req.session.userId).then(result => {
        console.log("Result of the get tours  is: ", result);
        res.json(result);
    });
});

app.post("/tours", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    const { title, description } = req.body;
    const url = config.s3Url + filename;
    // const { first, last } = req.body;
    console.log("the image url is:", url, title, description);
    if (req.file) {
        console.log("The req.file in tours is :", req.file);
    }
    db.addTours(url, title, description).then(result => {
        console.log("The new image is:", result);
        // url.unshift();
        res.json({
            image: url,
            title: title,
            description: description
        });
    });
});

////////////////////////////////////////tour guides//////////
app.get("/tourguides.json", (req, res) => {
    // console.log("comments get route");
    console.log("Server in get /tourguides", res.data);
    db.getTourguides(req.session.userId).then(result => {
        console.log("Result of the get tours  is: ", result);
        res.json(result);
    });
});

app.post("/tourguides", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    const { title, description } = req.body;
    const url = config.s3Url + filename;
    // const { first, last } = req.body;
    console.log("the image url is:", url, title, description);
    if (req.file) {
        console.log("The req.file in tourguides is :", req.file);
    }
    db.addTourguides(url, title, description).then(result => {
        console.log("The new image is:", result);
        // url.unshift();
        res.json({
            image: url,
            title: title,
            description: description
        });
    });
});

///////////modalbox/////////////////

////////////////////////////////////////////////////////////
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});
//This route needs to  be last
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

server.listen(8080, function() {
    console.log("I'm listening.");
});

//SERVER SIDE SOCKET CODE //
//1.we need 2 things in here...
// we need to make a DB query ...to get  the last 10 messages...
//db.getLastTenMessages().then(data=>{
//here is where we EMIT those chat messages...
//something i like...
//io.sockets.emit('chat messages',data.rows) I must console.log first
//})

io.on("connection", function(socket) {
    console.log(`a socket with the id ${socket.id} just connected`);
    if (!socket.request.session.userId) {
        //IF the user is not loggedin then disconnect
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;

    socket.on("chat message", msg => {
        //in socket.on i put the query when somebody types a new comment
        console.log("message received!");
        console.log("and this is the message:", msg);

        db.addNewChatComments(userId, msg).then(data => {
            // console.log("get user for chat ");

            db.addUsersInfo(userId).then(result => {
                console.log("get users info for chat ", result[0].last); //i must access correct the object
                var info = {
                    first: result[0].first,
                    last: result[0].last,
                    imageurl: result[0].imageurl,
                    created_at: result[0].created_at,
                    message: msg
                };

                data.reverse();
                console.log("addNewChatComments in index is:", info);
                io.sockets.emit("new chat message", info);
            });
        });
        // io.sockets.emit("message from server", msg); //i must ask tomorrow for that!
        // will pass it to sockets.js .This is msg from the server
    });

    db.getTenLastMessages().then(data => {
        console.log("get ten last messages", data);
        // io.sockets.emit("tenMessages", data);
        data.reverse();
        io.sockets.emit("ten messages from server", data);

        // db.getTenLastMessages().then(data => {
        //     io.sockets.emit("chat messages", data);
    });
});

//2.Deal with new chat message...
//socket.io('new message',(callback)=>{
// i. get all the info about the user  i.e a db query.
//ii. add chat message to DB.
//iii. could create a chat message object or use the data from  above query
//iv. io.sockets.emit('new chat message')
// })
// io.on("connection", function(socket) {
//     if (!socket.request.session.userId) {
//         db.getMessages().then(data=>{
//             io.sockets.emit('chat messages',data.rows)
//         //IF the user is not loggedin then disconnect
//         return socket.disconnect(true);
//     }

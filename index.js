// const express = require("express"),
//   morgan = require("morgan"),
//   bodyParser = require("body-parser"),
//   uuid = require("uuid");
// mongoose = require("mongoose");
// Models = require("./models.js");
// const app = express();
// const Movies = Models.Movie;
// const Users = Models.User;

// const { check, validationResult } = require('express-validator');

// app.use(morgan("common"));
// app.use(express.static("public"));
// app.use(bodyParser.json());
// let auth = require('./auth')(app);
// const passport = require('passport');
// require('./passport');

// // local connection
// // mongoose.connect("mongodb://localhost:27017/myFlixdb", {useNewUrlParser: true});
// mongoose.connect(
//   process.env.CONNECTION_URI,
//   { useNewUrlParser: true }
// );


// const cors = require('cors');
//   let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

//   app.use(cors({
//     origin: (origin, callback) => {
//       if(!origin) return callback(null, true);
//       if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
//         let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
//         return callback(new Error(message ), false);
//       }
//       return callback(null, true);
//     }
//   }));



// //list of all movies
// app.get("/", function (req, res) {
//   return res.status(400).send("Welcome to my Flix App");
// });

// app.get("/movies",function (
//   req,
//   res
// ) {
//   Movies.find()
//     .then(function (movies) {
//       res.status(201).json(movies);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });
// //get information about movie by title
// app.get("/movies/:Title", passport.authenticate('jwt', { session: false }),function (req, res) {
//   Movies.findOne({ Title: req.params.Title })
//     .then(function (movies) {
//       res.json(movies);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });

// //get data about director
// app.get("/movies/director/:Name", passport.authenticate('jwt', { session: false }),function (req, res) {
//   Movies.findOne({ "Director.Name": req.params.Name })
//     .then(function (movies) {
//       res.json(movies.Director);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });

// //get data about genre by name
// app.get("/movies/genre/:Name", passport.authenticate('jwt', { session: false }),function (req, res) {
//   Movies.findOne({ "Genre.Name": req.params.Name })
//     .then(function (movies) {
//       res.json(movies.Genre);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });

// //get list of users
// app.get("/users",function (
//   req,
//   res
// ) {
//   Users.find()
//     .then(function (users) {
//       res.status(201).json(users);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });

// //get a user by username
// app.get(
//   "/users/:Username",passport.authenticate('jwt', { session: false }),
//   function (req, res) {
//     Users.findOne({ Username: req.params.Username })
//       .then(function (user) {
//         res.json(user);
//       })
//       .catch(function (err) {
//         console.error(err);
//         res.status(500).send("Error: " + err);
//       });
//   }
// );

// //Add new user
// /* We’ll expect JSON in this format
// {
//  ID : Integer,
//  Username : String,
//  Password : String,
//  Email : String,
//  Birthday : Date
// }*/

// app.post(
//   "/users",
//   [
//     check('Username', 'Username is required').isLength({min: 5}),
//     check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
//     check('Password', 'Password is required').not().isEmpty(),
//     check('Email', 'Email does not appear to be valid').isEmail()
//   ],
//   (req, res) => {
//     let errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }
//     let hashedPassword = Users.hashPassword(req.body.Password);
//     Users.findOne({ Username: req.body.Username })
//       .then(function (user) {
//         if (user) {
//           return res.status(400).send(req.body.Username + " already exists");
//         } else {
//           Users.create({
//             Username: req.body.Username,
//             Password: hashedPassword,
//             Email: req.body.Email,
//             Birthday: req.body.Birthday,
//           })
//             .then(function (user) {
//               res.status(201).json(user);
//             })
//             .catch(function (error) {
//               console.error(error);
//               res.status(500).send("Error: " + error);
//             });
//         }
//       })
//       .catch(function (error) {
//         console.error(error);
//         res.status(500).send("Error: " + error);
//       });
//   }
// );
// // delete user from the list by username
// app.delete(
//   "/users/:Username",passport.authenticate('jwt', { session: false }),
//   function (req, res) {
//     Users.findOneAndRemove({ Username: req.params.Username })
//       .then(function (user) {
//         if (!user) {
//           res.status(400).send(req.params.Username + " was not found");
//         } else {
//           res.status(200).send(req.params.Username + " was deleted.");
//         }
//       })
//       .catch(function (err) {
//         console.error(err);
//         res.status(500).send("Error: " + err);
//       });
//   }
// );

// // Update user info by username
// /* We’ll expect JSON in this format
// {
//   Username: String,
//   (required)
//   Password: String,
//   (required)
//   Email: String,
//   (required)
//   Birthday: Date
// }*/
// app.put(
//   "/users/:Username",passport.authenticate('jwt', { session: false }),
//   function (req, res) {
//     let hashedPassword = Users.hashPassword(req.body.Password);
//     Users.findOneAndUpdate(
//       { Username: req.params.Username },
//       {
//         $set: {
//           Username: req.body.Username,
//           Password: hashedPassword,
//           Email: req.body.Email,
//           Birthday: req.body.Birthday,
//         },
//       },
//       { new: true }, //this line makes sure that the updated document is returned
//       function (err, updatedUser) {
//         if (err) {
//           console.error(err);
//           res.status(500).send("Error: " + err);
//         } else {
//           res.json(updatedUser);
//         }
//       }
//     );
//   }
// );

// // Add movie to favorites list
// app.post(
//   "/users/:Username/movies/:MovieID",passport.authenticate('jwt', { session: false }),
//   function (req, res) {
//     Users.findOneAndUpdate(
//       { Username: req.params.Username },
//       {
//         $push: { FavoriteMovies: req.params.MovieID },
//       },
//       { new: true }, // This line makes sure that the updated document is returned
//       function (err, updatedUser) {
//         if (err) {
//           console.error(err);
//           res.status(500).send("Error: " + err);
//         } else {
//           res.json(updatedUser);
//         }
//       }
//     );
//   }
// );

// // delete movie from favorite list for user
// app.delete(
//   "/users/:Username/movies/:MovieID",passport.authenticate('jwt', { session: false }),
//   function (req, res) {
//     Users.findOneAndUpdate(
//       { Username: req.params.Username },
//       { $pull: { FavoriteMovies: req.params.MovieID } },
//       { new: true },
//       function (err, updatedUser) {
//         if (err) {
//           console.error(err);
//           res.status(500).send("Error: " + err);
//         } else {
//           res.json(updatedUser);
//         }
//       }
//     );
//   }
// );

// var port = process.env.PORT || 8080;
// app.listen(port, "0.0.0.0", function () {
//   console.log("Listening on port 8080");
//   });

  
const express = require("express"),
bodyParser = require("body-parser"),
uuid = require("uuid");

const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");
const passport = require("passport");
require("./passport");
const cors = require("cors");
app.use(cors());
const { check, validationResult } = require("express-validator");

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect(process.env.CONNECTION_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
});

app.use(bodyParser.json());

//log requests to server
app.use(morgan("common"));

//import auth into index
let auth = require("./auth")(app);

//default text response when at /
app.get("/", (req, res) => {
res.send("Welcome to MyFlix!");
});

//return JSON object when at /movies
app.get(
"/movies",
// passport.authenticate("jwt", { session: false }),
(req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
}
);

app.get("/users", passport.authenticate("jwt", { session: false }), function (
req,
res
) {
Users.find()
  .then(function (users) {
    res.status(201).json(users);
  })
  .catch(function (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//GET JSON movie info when looking for specific title
app.get("/movies/:Title", (req, res) => {
Movies.findOne({ Title: req.params.Title })
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//GET JSON genre info when looking for specific genre
app.get("/genre/:Name", (req, res) => {
Genres.findOne({ Name: req.params.Name })
  .then((genre) => {
    res.json(genre.Description);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//get info on director when looking for specific director
app.get("/director/:Name", (req, res) => {
Directors.findOne({ Name: req.params.Name })
  .then((director) => {
    res.json(director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//allow users to register
app.post(
"/users",
[
  check("Username", "Username is required").isLength({ min: 5 }),
  check(
    "Username",
    "Username contains non alphanumeric characters - not allowed."
  ).isAlphanumeric(),
  check("Password", "Password is required").not().isEmpty(),
  check("Email", "Email does not appear to be valid").isEmail(),
],
(req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birth: req.body.Birth,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
}
);

//allow users to update their user info
app.put(
"/users/:Username",
passport.authenticate("jwt", { session: false }),
(req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birth: req.body.Birth,
      },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
}
);

//allow user to deregister
app.delete(
"/users/:Username",
passport.authenticate("jwt", { session: false }),
(req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
}
);

//add movie to username's list
app.post(
"/users/:Username/Movies/:MovieID",
passport.authenticate("jwt", { session: false }),
(req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { Fav: req.params.MovieID },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
}
);

//remove movie from username's list
app.delete(
"/users/:Username/Movies/:MovieID",
passport.authenticate("jwt", { session: false }),
(req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: { Fav: req.params.MovieID } },
    { new: true },
    (error, updatedUser) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      } else {
        res.json(updatedUser);
      }
    }
  );
}
);

//access documentation.html using express.static
app.use("/documentation", express.static("public"));

//error handling
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send("Error");
});

//listen on port
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
console.log("Listening on Port " + port);
});
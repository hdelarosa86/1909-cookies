const express = require('express');
const chalk = require('chalk');
const path = require('path');
const moment = require('moment');
const cookieParser = require('cookie-parser');
const { db, models } = require('./db/index.js');

const { User } = models.models;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  console.log(chalk.cyan(`${req.method} ${req.path}`));
  const userId = req.cookies['userId'];
  console.log(userId);


  next();
});

app.use(express.static(path.join(__dirname, '../dist')));

app.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  User.update(
    { loggedIn: true },
    { where: { username, password }, returning: true }
  )
    .then(([rowsUpdated, [updatedUser]]) => {
      console.log(updatedUser);
      return res.status(201).cookie('userId', updatedUser.id ).send(updatedUser);
    })
    .catch(err => {
      res.status(401);
      console.error(err);
      return res.send({ err });
    });
});

db.sync({ force: true })
  .then(() => {
    User.create({ username: 'Squidward', password: 'iplayclarinet420' });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        chalk.greenBright(`Server is listening on http://localhost:${PORT}`)
      );
    });
  })
  .catch(e => {
    console.error(e);
  });

// .cookie('userId', user.id))

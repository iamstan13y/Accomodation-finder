const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connection to database established successfully!');
});

const usersRouter = require('./routes/users');
app.use('/user', usersRouter);

const applicationsRouter = require('./routes/applications');
app.use('/applications', applicationsRouter);

const hostelsRouter = require('./routes/hostels');
app.use('/hostels', hostelsRouter);

const offCampusRouter = require('./routes/offcampus');
app.use('/offcampus', offCampusRouter);

const studentRouter = require('./routes/students');
app.use('/students', studentRouter);

const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);
// const imagesRouter = require("./routes/web");
// app.use(express.urlencoded({ extended: true }));
// imagesRouter(app);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
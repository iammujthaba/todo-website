import express from 'express';
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

function dayPic(){
    var title = ["Today", "Work"]
    var arr = [];   
    var date = new Date();
    // Get the day of the week.
    var day = date.getDay();
    var dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // Get the month of the year.
    var month = date.getMonth();
    var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // Get the year.
    var year = date.getFullYear();

    arr[0] = dayName[day];
    arr[1] = monthName[month];
    arr[2] = year;
    arr[3] = title
    return arr;
}

var getDay = dayPic()
app.get('/',(req, res) => {
    res.render("index.ejs", { 
        day: getDay[0],
        month: getDay[1],
        year: getDay[2],
        tit: "Today",
        todo: notes
    });
});
app.get('/work',(req, res) => {
    res.render("index.ejs", { 
        day: getDay[0],
        month: getDay[1],
        year: getDay[2],
        tit: "Work",
        todo: work
    });
});

var notes = [];
app.post('/',(req, res) => {
    var i = notes.length;
    notes[i] = req.body['myInput'];
    res.render("index.ejs",{
        day: getDay[0],
        month: getDay[1],
        year: getDay[2],
        titles: getDay[3],
        tit: "Today",
        todo: notes
    })
});
var work = [];
app.post('/work',(req, res) => {
    var i = work.length;
    work[i] = req.body['myInput'];
    res.render("index.ejs",{
        day: getDay[0],
        month: getDay[1],
        year: getDay[2],
        titles: getDay[3],
        tit: "Work",
        todo: work
    })
});

app.listen(port, () => {
    console.log(`Server renning on port ${port}`);
});
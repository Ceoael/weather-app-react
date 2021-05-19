const express = require("express");
const cors = require("cors"); // can comment when serving combined frontend and backend

const weatherRoutes = require('./routes/weather');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/weather', weatherRoutes);


if( process.env.NODE_ENV === 'production' ) {
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
} else {
    app.get('/', (req, res) => {                    
        res.send("Weather server is ready!");       
    });  
}

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
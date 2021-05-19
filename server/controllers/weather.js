const axios = require('axios');

exports.getLocation = (req, res, next) => {
    try {
        let query='';

        if(req.query.lattlong) {
            query = `lattlong=${req.query.lattlong}`;
        }
        else if(req.query.query) {
            query = `query=${req.query.query}`;
        }

        const url = `https://www.metaweather.com/api/location/search/?${query}`;

        axios({url: url, responseType: 'json'})
            .then( (data) => {
                return res.status(200).send(data.data);
            })
            .catch((err)=>console.log(err))

    } catch (err) {
        console.log(err);
    }
}

exports.getWeather = (req, res, next) => {
    try {
        const query = req.query.woeid;

        const url = `https://www.metaweather.com/api/location/${query}/`;

        axios({
            url: url,
            responseType: 'json'
        })
            .then( (data) => {
                return res.status(200).send(data.data);
            })
            .catch((err)=>console.log(err))
    } catch (err) {
        console.log(err);
    }
}
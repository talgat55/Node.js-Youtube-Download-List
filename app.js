import ytdl from 'ytdl-core';
import youtube from 'youtube-search';
import config from './config/config.json';
    var opts = {

        maxResults: 10,
        key: config.api

    };

    youtube("react.js tutorials", opts, function(err, results) { // search videos
        if (err) {

            console.log(err); 

        } else {

            

    		console.log(results);
 

        }

    });


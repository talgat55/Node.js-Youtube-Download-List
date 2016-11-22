 
import request from 'request';
import youtube from 'youtube-search';
import config from './config/config.json';
 
import path from 'path';
import fs   from 'fs';
import program   from 'commander';
import ytdl from 'youtube-dl';

    let opts = {

        maxResults: 10,
        key: config.api

    };
let  playlist = (url) => {
  
  let video = ytdl(url);
    console.log("download");
  video.on('error', (err) => {
    console.log('error 2:', err);
  });
 
  let size = 0;
  video.on('info', (info) =>{
    size = info.size;
    let output = path.join(__dirname + '/', size + '.mp4');
      console.log("write dideo");
    video.pipe(fs.createWriteStream(output));

  });
 
  let pos = 0;
  video.on('data', (chunk) => {
    pos += chunk.length;
    // `size` should not be 0 here. 
    if (size) {
      let percent = (pos / size * 100).toFixed(2);
      process.stdout.cursorTo(0);
      process.stdout.clearLine(1);
      process.stdout.write(percent + '%');
    }
  });
 
  video.on('next', playlist);
 
}


program
  .version('0.0.1')
  .option('-q, --query', 'Add Query') 
  .parse(process.argv);
 
 if (program.query) {
 
    youtube(program.query, opts, (err, results) => { // search videos
        if (err) {

            console.log(err); 

        } else {

            let $i;
            for($i=0; $i<=results.length; $i++){
               
                if(results[$i]){
                    if(results[$i].kind == "youtube#playlist" ){

                        playlist(results[$i].link);

                    }

                }
                 
            }
 
 

        }

    });
 };
      
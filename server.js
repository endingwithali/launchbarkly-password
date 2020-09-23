import express from 'express'
import LaunchDarkly from 'launchdarkly-node-server-sdk'
import bcrypt from 'bcrypt'
import pbkdf2 from 'pbkdf2'
import dotenv from 'dotenv'

dotenv.config();
const PORT = process.env.PORT || 3000
const app = express();
const ldClient = LaunchDarkly.init(process.env.LD_PROD_KEY);

const user = {
    key :"server"
 };


//THIS WORKS!!!
ldClient.once("ready", () => {
    app.get('/', function(req, res){
        ldClient.variation("launchbarkly", {"key": "user@test.com"}, false,
        (err, showFeature) => {
            console.log(err)
            if (showFeature) {
                console.log("here")
            // application code to show the feature
            } else {
                console.log('there')
            // the code to run if the feature is off
            }
        });
        res.send('POST');
    })

    app.listen(PORT, () => {
        console.log(`Listening on ${ PORT }`)
        // hash("b")
    });
    // ldClient.variation("launchbarkly", {"key": "user@test.com"}, false,
    //   (err, showFeature) => {
    //       console.log(err)
    //     if (showFeature) {
    //         console.log("here")
    //       // application code to show the feature
    //     } else {
    //         console.log('there')
    //       // the code to run if the feature is off
    //     }
    //   });
  });


// process.on('SIGTERM', () => {
//     console.info('SIGTERM signal received.');
//     console.log('Closing http server.');
//     ldClient.close();
//     server.close(() => {
//       console.log('Http server closed.');
//     });
// });


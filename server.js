import express from 'express';
import LaunchDarkly from 'launchdarkly-node-server-sdk';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const ldClient = LaunchDarkly.init(process.env.LD_PROD_KEY);

ldClient.once("ready", () => {
    /**
     * Checks to see what method the application should be use for password hashing 
     * 
     * @return {boolean} true = use bcrypt
     * @return {boolean} false = use pbkdf2
     * 
     */
    app.get('/', function(req, res){
        res.setHeader('Content-Type', 'application/json');
        ldClient.variation("launchbarkly", {"key": "server"}, false, (err, showFeature) => {
            if (showFeature) {
                res.json({type: 'bcrypt'});
            } else {
                res.json({type: 'sha256'});
            }
        });
    })

    app.listen(PORT, () => {
        console.log(`Listening on ${ PORT }`);
    });

    process.on('SIGINT', function() {
        console.log('Quitting...');
        ldClient.close()
        process.exit(0);
      });
  });


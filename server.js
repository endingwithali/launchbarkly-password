import express from 'express'
import LaunchDarkly from 'launchdarkly-node-server-sdk'
import dotenv from 'dotenv'

dotenv.config();
const PORT = process.env.PORT || 3000
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
        ldClient.variation("launchbarkly", {"key": "server"}, false,
        (err, showFeature) => {
            if (showFeature) {
                res.send('bcrypt')
            } else {
                res.send('pbkdf2')
            }
        });
    })

    app.listen(PORT, () => {
        console.log(`Listening on ${ PORT }`)
    });

    process.on('SIGINT', function() {
        console.log('quitting...');
        ldClient.close()
        process.exit(0);
      });
  });


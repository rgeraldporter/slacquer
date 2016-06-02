# Slacquer

Send and receieve messages from Slack in Node.js!

# Usage

## Import

You can import either via CommonJS or ES6, depending on what you're using.

```javascript
var Slacquer = require( 'slacquer' );
```

or 

```javascript
import Slacquer from 'slacquer';
```

## Send

```javascript
    let slack = new Slacquer( 'https://mywebhook.url/192873982173' );

    // Slacquer.send is a Promise
    slack.send({

            text:       'This is a test.',
            channel:    '#testing-bots',
            username:   'my-cool-bot'
        })
        .then( response => {

            // do something with <response.body>
        })
    ;
```

## Respond

```javascript
    let slack = new Slacquer( 'https://mywebhook.url/192873982173' );

    slack.respond( req.body )
        .then( response => {

            console.log( response.userName + ' said: "' + response.text + '"' );
        })
    ;
```

# Build

You can build easily with `gulp`, which will test then build. To just test, run `gulp test`. More tests are coming...

# Requirements

You'll need a Slack account and a webhook URL set up.

# Contribute

Please fork the project, then use a pull request to make improvements and fixes.

# Authors and Acknowledgements

Written by [Robert Gerald Porter](https://github.com/rgeraldporter).

Based upon [node-slack](https://github.com/xoxco/node-slack) by [Ben Brown](https://github.com/benbrown).

# License

BSD
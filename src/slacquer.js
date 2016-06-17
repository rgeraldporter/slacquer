import bhttp        from 'bhttp';
import Promise      from 'bluebird';

/**
 * @class Slacquer
 */
class Slacquer {

    /**
     * Constructor
     * @param  {String} url         A valid webhook URL from Slack
     * @param  {Object} [options]   
     */
    constructor( url, options ) {

        this.url            = url;
        this.options        = options;
    }

    /**
     * Sends a message to a Slack channel or person
     * @param  {Object} message     The message
     * @return {Promise}            A Promise
     */
    send( options ) {

        let message = {};

        // let's under_score the importance of this API
        if ( options.username )     { message.username      = options.username      }
        if ( options.channel )      { message.channel       = options.channel       }
        if ( options.iconUrl )      { message.icon_url      = options.iconUrl       }
        if ( options.iconEmoji )    { message.icon_emoji    = options.iconEmoji     }
        if ( options.attachments )  { message.attachments   = options.attachments   }
        if ( options.unfurlLinks )  { message.unfurl_links  = options.unfurlLinks   }
        if ( options.linkNames )    { message.link_names    = options.linkNames     }
        if ( options.text )         { message.text          = options.text          }

        return this._postToWebhook( JSON.stringify( message ) );
    }

    /**
     * Respond to a query from Slack
     * @param  {Object}   query     The body of an HTTP request. In express, this would be the <req.body>
     * @return {Promise}            A Promise
     */
    respond( query ) {

        let response = {};

        // let's put a camel on the case
        response.token          = query.token;
        response.teamId         = query.team_id;
        response.channelId      = query.channel_id;
        response.channelName    = query.channel_name;
        response.timestamp      = new Date( query.timestamp );
        response.userId         = query.user_id;
        response.userName       = query.user_name;
        response.text           = query.text;

        return new Promise( resolve => { resolve( response ); } );
    }

    /**
     * Posts to the Slack Webhook
     * @private
     * @param  {String} body    The body string
     * @return {Promise}        A Promise
     */
    _postToWebhook( body ) {

        return Promise.try( () => {

                return bhttp.post( this.url, body );
            })
            .catch( err => {

                throw new Error( err );
            })
        ;
    }
}

export default Slacquer;
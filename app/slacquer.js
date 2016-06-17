'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bhttp = require('bhttp');

var _bhttp2 = _interopRequireDefault(_bhttp);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Slacquer
 */

var Slacquer = function () {

    /**
     * Constructor
     * @param  {String} url         A valid webhook URL from Slack
     * @param  {Object} [options]   
     */

    function Slacquer(url, options) {
        _classCallCheck(this, Slacquer);

        this.url = url;
        this.options = options;
    }

    /**
     * Sends a message to a Slack channel or person
     * @param  {Object} message     The message
     * @return {Promise}            A Promise
     */


    _createClass(Slacquer, [{
        key: 'send',
        value: function send(options) {

            var message = {};

            // let's under_score the importance of this API
            if (options.username) {
                message.username = options.username;
            }
            if (options.channel) {
                message.channel = options.channel;
            }
            if (options.iconUrl) {
                message.icon_url = options.iconUrl;
            }
            if (options.iconEmoji) {
                message.icon_emoji = options.iconEmoji;
            }
            if (options.attachments) {
                message.attachments = options.attachments;
            }
            if (options.unfurlLinks) {
                message.unfurl_links = options.unfurlLinks;
            }
            if (options.linkNames) {
                message.link_names = options.linkNames;
            }
            if (options.text) {
                message.text = options.text;
            }

            return this._postToWebhook(JSON.stringify(message));
        }

        /**
         * Respond to a query from Slack
         * @param  {Object}   query     The body of an HTTP request. In express, this would be the <req.body>
         * @return {Promise}            A Promise
         */

    }, {
        key: 'respond',
        value: function respond(query) {

            var response = {};

            // let's put a camel on the case
            response.token = query.token;
            response.teamId = query.team_id;
            response.channelId = query.channel_id;
            response.channelName = query.channel_name;
            response.timestamp = new Date(query.timestamp);
            response.userId = query.user_id;
            response.userName = query.user_name;
            response.text = query.text;

            return new _bluebird2.default(function (resolve) {
                resolve(response);
            });
        }

        /**
         * Posts to the Slack Webhook
         * @private
         * @param  {String} body    The body string
         * @return {Promise}        A Promise
         */

    }, {
        key: '_postToWebhook',
        value: function _postToWebhook(body) {
            var _this = this;

            return _bluebird2.default.try(function () {

                return _bhttp2.default.post(_this.url, body);
            }).catch(function (err) {

                throw new Error(err);
            });
        }
    }]);

    return Slacquer;
}();

exports.default = Slacquer;
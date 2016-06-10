'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _slacquer = require('./slacquer');

var _slacquer2 = _interopRequireDefault(_slacquer);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('The Slacquer class', function () {

    var slack = void 0;

    beforeEach(function () {

        slack = new _slacquer2.default('https://hooks.slack.com/services/my-web-hook');

        spyOn(slack, '_postToWebhook').and.callFake(function (body) {

            return new _bluebird2.default(function (resolve) {
                resolve(JSON.parse(body));
            });
        });
    });

    it('should have send and respond methods', function () {

        expect(_typeof(slack.send)).toBe('function');
        expect(_typeof(slack.respond)).toBe('function');
    });

    it('should be able to send a message to Slack', function (done) {

        slack.send({

            text: 'This is a test.',
            channel: '@robporter',
            username: 'my-bot'
        }).then(function (response) {

            expect(!!response).toBe(true);
            done();
        });
    });

    it('should be able to send a message to Slack, converting camelCase properties to under_scores', function (done) {

        slack.send({

            text: 'This is a test.',
            channel: '@robporter',
            username: 'my-bot',
            iconUrl: 'http://example.com/my-cool-icon.png'
        }).then(function (response) {

            expect(response.icon_url).toBe('http://example.com/my-cool-icon.png');
            expect(_typeof(response.iconUrl)).toBe('undefined');
            done();
        });
    });

    it('should be able to convert a req.body request from Slack in the response function', function (done) {

        slack.respond({

            token: '123',
            team_id: '1',
            channel_id: '2',
            channel_name: 'testing-stuff',
            timestamp: 1464833038,
            user_id: 'ABC',
            user_name: 'testor',
            text: 'my message'
        }).then(function (response) {

            expect(response.userId).toBe('ABC');
            expect(_typeof(response.user_id)).toBe('undefined');
            expect(response.timestamp instanceof Date).toBe(true);
            done();
        });
    });
});

describe('The Slacquer class', function () {

    var slack = void 0;

    beforeEach(function () {

        slack = new _slacquer2.default('https://hooks.slack.com/services/my-web-hook');

        spyOn(slack, '_postToWebhook').and.callFake(function (body) {

            return new _bluebird2.default(function (resolve, reject) {
                reject(true);
            });
        });
    });

    it('should be able to throw errors to a Promise.catch', function (done) {

        slack.send({

            text: 'This is a test.',
            channel: '@robporter',
            username: 'my-bot'
        }).then(function (response) {

            expect(!!response).toBe(false);
            done();
        }).catch(function (err) {

            expect(!!err).toBe(true);
            done();
        });
    });
});
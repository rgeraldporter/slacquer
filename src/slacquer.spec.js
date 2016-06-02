import Slacquer         from './slacquer';
import Promise          from 'bluebird';

describe( 'The Slacquer class', () => {

    let slack;

    beforeEach( () => {

        slack = new Slacquer( 'https://localhost/' );

        spyOn( slack, '_postToWebhook' ).and.callFake( body => {

            return new Promise( resolve => { resolve( JSON.parse( body ) ); } );
        });
    });

    it( 'should have send and respond methods', () => {

        expect( typeof slack.send ).toBe( 'function' );
        expect( typeof slack.respond ).toBe( 'function' );
    });

    it( 'should be able to send a message to Slack', done => {

        slack.send({

                text: 'This is a test.',
                channel: '@rgeraldporter',
                username: 'my-bot'
            })
            .then( response => {

                expect( !! response ).toBe( true );
                done();
            })
        ;
    });

    it( 'should be able to send a message to Slack, converting camelCase properties to under_scores', done => {

        slack.send({

                text:       'This is a test.',
                channel:    '@rgeraldporter',
                username:   'my-bot',
                iconUrl:    'http://example.com/my-cool-icon.png'
            })
            .then( response => {

                expect( response.icon_url ).toBe( 'http://example.com/my-cool-icon.png' );
                expect( typeof response.iconUrl ).toBe( 'undefined' );
                done();
            })
        ;
    });

    it( 'should be able to convert a req.body request from Slack in the response function', done => {

        slack.respond({

                token:          '123',
                team_id:        '1',
                channel_id:     '2',
                channel_name:   'testing-stuff',
                timestamp:      1464833038,
                user_id:        'ABC',
                user_name:      'testor',
                text:           'my message'
            })
            .then( response => {

                expect( response.userId ).toBe( 'ABC' );
                expect( typeof response.user_id ).toBe( 'undefined' );
                expect( response.timestamp instanceof Date ).toBe( true );
                done();
            })
        ;
    });
});

describe( 'The Slacquer class', () => {

    let slack;

    beforeEach( () => {

        slack = new Slacquer( 'https://localhost/' );

        spyOn( slack, '_postToWebhook' ).and.callFake( body => {

            return new Promise( ( resolve, reject ) => { reject( true ); } );
        });
    });

    it( 'should be able to throw errors to a Promise.catch', done => {

        slack.send({

                text: 'This is a test.',
                channel: '@rgeraldporter',
                username: 'my-bot'
            })
            .then( response => {

                expect( !! response ).toBe( false );
                done();
            })
            .catch( err => {

                expect( !! err ).toBe( true );
                done();
            })
        ;
    });
});

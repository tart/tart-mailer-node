#!/usr/bin/env node
/*
 * Tart Mailer - Node.js API Client - Regression Tests
 *
 * Copyright (c) 2013, Tart İnternet Teknolojileri Ticaret AŞ
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby
 * granted, provided that the above copyright notice and this permission notice appear in all copies.
 *
 * The software is provided "as is" and the author disclaims all warranties with regard to the software including all
 * implied warranties of merchantability and fitness. In no event shall the author be liable for any special, direct,
 * indirect, or consequential damages or any damages whatsoever resulting from loss of use, data or profits, whether
 * in an action of contract, negligence or other tortious action, arising out of or in connection with the use or
 * performance of this software.
 */

var tartMailer = require('./');

var client = new tartMailer({
    url: 'http://localhost:8080/',
    auth: {
        user: 'tart-mailer@github.com',
        pass: 'secret'
    }
});

var tests = [
    ['getSender'],
    ['setSender', {'fromName': 'Osman'}],
    ['addEmail', {
        'bulk': true,
        'redirectURL': 'http://tr.wikipedia.org',
        'variations': [
            {
                'subject': 'Wiki',
                'plainbody': 'Check out Wikipedia.'
            },
            {
                'subject': 'Wikipedia',
                'plainbody': 'Try Wikipedia.'
            }
        ]
    }],
    ['listEmails'],
    ['filterEmails', {
        'bulk': true
    }],
    ['addEmailVariation', 1, {
        'subject': 'Extra Variation',
        'plainBody': 'This is the one.'
    }],
    ['getEmail', 1],
    ['getEmailVariation', 1, 1],
    ['upsertEmailVariation', 1, 2, {
        'subject': 'Extra Variation',
        'plainBody': 'This is the second.'
    }],
    ['listMessagesSend', 1],
    ['filterMessagesSend', 1, {
        'sent': false
    }],
    ['listSubscribers'],
    ['subscribe', 'osman@spam.bo', {
        'locale': 'tr_TR',
        'properties': {
            'firstname': 'Osman',
            'lastname': 'Kabalak'
        }
    }],
    ['filterSubscribers', {
        'locale': 'tr_TR',
        'properties': {
            'firstname': 'Osman'
        }
    }],
    ['sendToSubscriber', 'osman@spam.bo', {
        'redirectURL': 'http://click.xxx/?from=mailer',
        'subject': 'Click this link!',
        'plainBody': 'Click: {redirecturl}',
        'hTMLBody': '<h1>XXX</h1><p><a href=\'{redirecturl}\'>click</a></p>'
    }],
    ['listMessagesSendToSubscriber', 'osman@spam.bo'],
    ['filterMessagesSendToSubscriber', 'osman@spam.bo', {
        'sent': false
    }]
];

run();

function run() {
    var args = tests.shift();
    var method = args.shift();
    args.push(callback);

    console.log('Testing ' + method + '...');
    client[method].apply(client, args);
}

function callback(err, result) {
    if(err)
        console.log(err);
    if(result)
        console.log(result);
    console.log();

    if(tests.length > 0)
        run();
}

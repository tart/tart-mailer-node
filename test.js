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
    ['subscribe', 'osman@spam.bo', {}],
    ['listSubscribers']
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

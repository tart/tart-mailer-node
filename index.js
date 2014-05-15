/*
 * Tart Mailer - Node.js API Client
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

var request = require('request');

function tartMailer(opt) {
    this.options = {
        url: opt.url,
        json: true,
        auth: opt.auth
    };
};

tartMailer.prototype.subscribe = function(email, opt_data, cb) {
    var options = {
        url: this.options.url + 'subscriber/' + email,
        method: 'PUT',
        json: opt_data || true,
        auth: this.options.auth
    };

    request(options, function(err, httpResponse, body) {
        if(err) return cb(err);

        if(httpResponse.statusCode != 200) return cb('err: ' + httpResponse.statusCode);

        cb(null, body);
    });
};

tartMailer.prototype.listSubscribers = function(cb) {
    var options = {
        url: this.options.url + 'subscriber/list',
        method: 'GET',
        json: true,
        auth: this.options.auth
    };

    request(options, function(err, httpResponse, body) {
        if(err) return cb(err);

        if(httpResponse.statusCode != 200) return cb('err: ' + httpResponse.statusCode);

        cb(null, body);
    });
}

module.exports = tartMailer;

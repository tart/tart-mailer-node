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

function tartMailer(options) {
    this.root = options.url;
    this.auth = options.auth;
}

tartMailer.prototype.request = function(options, callback) {
    options.auth = this.auth;

    request(options, function(err, httpResponse, body) {
        if(!err && httpResponse.statusCode >= 400)
            err = 'err: ' + httpResponse.statusCode;

        callback(err, body);
    });
};

tartMailer.prototype.getSender = function(callback) {
    return this.request({
        url: this.root + 'sender',
        method: 'GET'
    }, callback);
};

tartMailer.prototype.setSender = function(data, callback) {
    return this.request({
        url: this.root + 'sender',
        method: 'PUT',
        json: data
    }, callback);
};

tartMailer.prototype.addEmail = function(data, callback) {
    return this.request({
        url: this.root + 'email',
        method: 'POST',
        json: data
    }, callback);
};

tartMailer.prototype.listEmails = function(callback) {
    return this.request({
        url: this.root + 'email/list',
        method: 'GET'
    }, callback);
};

tartMailer.prototype.filterEmails = function(data, callback) {
    return this.request({
        url: this.root + 'email/list',
        method: 'POST',
        json: data
    }, callback);
};

tartMailer.prototype.addEmailVariation = function(emailId, data, callback) {
    return this.request({
        url: this.root + 'email/' + emailId + '/variation',
        method: 'POST',
        json: data
    }, callback);
};

tartMailer.prototype.getEmail = function(emailId, callback) {
    return this.request({
        url: this.root + 'email/' + emailId,
        method: 'GET'
    }, callback);
};

tartMailer.prototype.getEmailVariation = function(emailId, variationId, callback) {
    return this.request({
        url: this.root + 'email/' + emailId + '/variation/' + variationId,
        method: 'GET'
    }, callback);
};

tartMailer.prototype.listMessagesSend = function(emailId, callback) {
    return this.request({
        url: this.root + 'email/' + emailId + '/send/list',
        method: 'GET'
    }, callback);
};

tartMailer.prototype.filterMessagesSend = function(emailId, data, callback) {
    return this.request({
        url: this.root + 'email/' + emailId + '/send/list',
        method: 'POST',
        json: data
    }, callback);
};

tartMailer.prototype.upsertEmailVariation = function(emailId, variationId, data, callback) {
    return this.request({
        url: this.root + 'email/' + emailId + '/variation/' + variationId,
        method: 'PUT',
        json: data
    }, callback);
};

tartMailer.prototype.listSubscribers = function(callback) {
    return this.request({
        url: this.root + 'subscriber/list',
        method: 'GET'
    }, callback);
};

tartMailer.prototype.filterSubscribers = function(data, callback) {
    return this.request({
        url: this.root + 'subscriber/list',
        method: 'POST',
        json: data
    }, callback);
};

tartMailer.prototype.subscribe = function(fromAddress, data, callback) {
    return this.request({
        url: this.root + 'subscriber/' + fromAddress,
        method: 'PUT',
        json: data
    }, callback);
};

tartMailer.prototype.sendToSubscriber = function(fromAddress, data, callback) {
    return this.request({
        url: this.root + 'subscriber/' + fromAddress + '/send',
        method: 'POST',
        json: data
    }, callback);
};

tartMailer.prototype.listMessagesSendToSubscriber = function(fromAddress, callback) {
    return this.request({
        url: this.root + 'subscriber/' + fromAddress + '/send/list',
        method: 'GET'
    }, callback);
};

tartMailer.prototype.filterMessagesSendToSubscriber = function(fromAddress, data, callback) {
    return this.request({
        url: this.root + 'subscriber/' + fromAddress + '/send/list',
        method: 'POST',
        json: data
    }, callback);
};

module.exports = tartMailer;

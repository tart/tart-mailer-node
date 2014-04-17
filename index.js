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
        url: this.options.url + 'subscriber',
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

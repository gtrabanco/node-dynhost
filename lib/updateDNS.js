"use strict";

var ovh = require('./myovh');


module.exports = function (zoneName, subdomain, ip, type = 'A', ttl = 0) {
    
    //First get the record id (GET)
    // /domain/zone/{zoneName}/record
    return ovh.requestPromised('GET',
        '/domain/zone/{zoneName}/record',
        {
            zoneName: zoneName,
            fieldType: type,
            subDomain: subdomain
        })
    .then(function(res){

        let id = res[0];

        return ovh.requestPromised('PUT',
            '/domain/zone/{zoneName}/record/{id}',
            {
                zoneName: zoneName,
                id: id,
                target: ip,
                subDomain: subdomain,
                ttl: ttl || 60
            });

    })
    .catch(function (err) {

        console.error('Error: ', err);
        process.exit(1);
    });
};
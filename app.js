#!/usr/bin/env node

'use strict';
var s3 = require('s3'),
    bucket,
    objects = [],
    toDelete = [];

var client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET,
    region: process.env.S3_REGION || 'us-east-1'
  },
});

/**
 * Helpers
 **/

function printUsage(err) {
    console.log('\r\nempty-s3-bucket version 0.1.0.');
    console.log('\r\n    usage: empty-s3-bucket <bucket_name>');
    console.log('\r\nReads Amazon AWS settings from env.S3_ACCESS_KEY and S3_SECRET or from local config.js file, fetches a list of objects and deletes them.');
    if(err) {
        console.log('\r\nThere were errors in your request: \r\n\r\n', err);
    }
}

function extractKeys() {

    console.log('Got objects, extracting keys...');
    var length = objects.length;
    if(!length) {
        return;
    }

    for(var i = 0; i < length; i++) {

        toDelete.push({Key: objects[i].Key});
    }
}

function deleteFiles() {

    var length = toDelete.length;
    console.log('Deleting ' + length + ' files...');

    if(!length) {

        printUsage('No files to delete, bucket empty.');
        process.exit(0);
    }

    var s3Params = {

        Bucket: bucket,
        Delete: {
            Objects: toDelete
        }
    };

    var s3 = client.deleteObjects(s3Params);

    s3.on('error', function(err) {

        printUsage(err);
    });

    s3.on('end', function() {

        console.log('Bucket emptied.');
    });
}

function getListOfObjects() {

    console.log('Getting list of objects...');
    var s3 = client.listObjects({
        recursive: true,
        s3Params: {
            Bucket: bucket
        }
    }, function(err, data) {

        console.log('s3 params callback');
        console.log(err || data);
    });

    s3.on('error', function(err) {

        printUsage(err);
        process.exit(1);
    });

    s3.on('data', function(data) {

        if(data.Contents) {
            objects = objects.concat(data.Contents);
        }
    });

    s3.on('end', function() {

        extractKeys();
        deleteFiles();
    });
}

/**
 * start
 **/

bucket = process.argv[2];
if(!bucket) {
    printUsage('Please specify bucket.');
    process.exit(0);
}

getListOfObjects();

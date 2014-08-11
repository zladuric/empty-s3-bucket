Empty S3 Bucket
---------------

A simple script to fetch a list of objects on a bucket and delete them all.

## Usage: 

node empty-s3-bucket <bucket_name>

For now, the script is dumb and requires a config.js with setings:

    module.exports = {
        s3: {
            accessKey: '<MY_ACCESS_KEY>',
            secret: '<SECRET>',
            region: '<region>'
        }
    }

## Plans

No current plans for now, if I need more features, I'll add them. Feel free to PR, I will probably accept anything.



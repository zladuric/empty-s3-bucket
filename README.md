Empty S3 Bucket
---------------

A simple script to fetch a list of objects on a bucket and delete them all.

## Usage:

    npm -g install empty-s3-bucket

    empty-s3-bucket <bucket_name>

For now, the script is dumb and requires environment settings:

    export S3_ACCESS_KEY=<key>
    export S3_SECRET=<secret>
    export S3_REGION=<region>

# Changelog

- removed config.js, moved settings to CLI
- made script a binary, globally installable
## Plans

No current plans for now, if I need more features, I'll add them. Feel free to PR, I will probably accept anything.



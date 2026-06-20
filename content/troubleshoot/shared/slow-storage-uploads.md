If you are using external storage, make sure you’re able to upload to this storage service fast enough. Otherwise the delay in your files arriving at the storage provider that everyone is using to view the video will cause buffering.

If you have a slow upload connection, or you're uploading to an external storage service that is too far away, or not optimized for fast uploads, you may run into an issue where it takes too long to get the video segments uploaded, ultimately not making them available fast enough to be used.

1. Determine if there's another endpoint for your storage service that might be geographically closer to you.
1. Use a storage service that's as close (physically and logically) to where your Owncast instance is. For example if if you're on an AWS machine, use a S3 bucket in the same region. If you're on Digital Ocean, try DO Spaces. But maybe don't use DO Spaces if you're on a Linode machine, use Linode Object Storage instead. Run owncast with `--enableVerboseLogging` to see if you get any slow upload warnings.
1. Try to increase your upload speed from your server provider.
1. Find out if your storage service offers something like [AWS's Transfer Acceleration](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html) to (possibly) try to increase the speed of uploads.
1. Reduce the quality of your video so the video segments are smaller and take less time to upload.

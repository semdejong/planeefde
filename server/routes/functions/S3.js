const aws = require("aws-sdk");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const bucketAccesKey = process.env.AWS_ACCES_KEY;
const bucketSAccesKey = process.env.AWS_SECRET_ACCES_KEY;

aws.config.update({
  accessKeyId: bucketAccesKey,
  secretAccessKey: bucketSAccesKey,
  region: bucketRegion,
});

const s3 = new aws.S3();

//uploads a file to the s3 bucket
function uploadFile(file, name) {
  console.log(bucketSAccesKey, bucketRegion, bucketName);
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: name,
  };

  return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

//downloads a file from the s3 bucket
function downloadFile(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}
exports.downloadFile = downloadFile;

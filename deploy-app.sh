#/bin/bash

echo "building configuration for production....."
sleep 1

ng build --configuration=production

echo "Build is finished ..., listing /dist/oasis"
ls ./dist/catalog-counts-web

echo "uploading files into bucket"
sleep 1
aws s3 cp ./dist/catalog-counts-web s3://site.catalogcounts.com --recursive --profile javier.meza

echo "finish deployment of web application"
echo "bye...."
exit 0



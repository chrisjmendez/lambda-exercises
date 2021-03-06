# App 01

This app is designed to show you how to create, package and publish a Lambda function using AWS command line interface.

If you're unfamiliar with AWS Lambda, [read this tutorial first](http://www.chrisjmendez.com/2017/02/19/aws-lambda-on-osx/).



---

# Workflow

My development process starts off with me writing NodeJS functions on my local computer. Since I am using NPM modules ```faker``` and ```lodash```, I cannot copy and paste the code directly into the Lambda Dashboard. Therefore, I am zipping up the Javascript files and uploading them to an AWS S3 Bucket. From there, I assign the new Lambda functions to the .zip file.



# Getting Started

## Step 1 - Prerequisites 

You need to first do a few things to get started.  You must:

1. Install AWS Client either through [Homebrew](http://www.chrisjmendez.com/2017/02/18/aws-installing-aws-client-using-homebrew/) or [Manually](http://www.chrisjmendez.com/2017/02/17/aws-installing-aws-client-manually/)
* Create a user and permissions to use Lambda. You can learn more by reading the ["Getting Started"](http://www.chrisjmendez.com/2017/02/19/aws-lambda-on-osx/) section.
* Install NodeJS either through [Homebrew](http://blog.teamtreehouse.com/install-node-js-npm-mac) or [Manually](https://nodejs.org/en/)



## Step 2 - Install NPM Jake

This project relies on [Jake](https://www.npmjs.com/package/jake) to archive and upload files to AWS S3. Jake is similar to [Ruby Rake](http://www.chrisjmendez.com/2016/07/31/rails-5-tasks/) or [Java Ant](http://www.javaworld.com/article/2076208/java-app-dev/automate-your-build-process-using-java-and-ant.html). It helps you create command-lines that complete tedious tasks.

I'm installing Jake globally –and not as an ```npm``` ```devDependency```– so that we don't pollute the ```node_modules``` directory we will upload to S3. 

```language-powerbash
npm install -g jake
```



## Step 3 - Install 3rd party libraries

This project also relies on [dotenv]() to store app specific credentials. Here's how to configure the app to work for your specific project.

Change directory:
```language-powerbash
cd ./path/to/Basics/app-01/
```

Create a ```.env``` file
```
APP=name_of_zip_file
BUCKET=name_of_s3_bucket
AWSCLI_PROFILE=name_of_awscli_profile
```


Install any external libraries found within ```package.json```
```language-powerbash
npm install
```



---


## Reviewing existing Jake tasks

If you want to see what tasks have been specifically created for this project, run this command. 
```language-powerbash
jake -T
```


---



## Using Jake for Deployment

Since our app is using 3rd party NodeJS libraries, we cannot copy and paste our Lambda code to the browser directly. Instead, we must archive the files into .zip and upload them using the ```aws``` client.

You can run the ```jake``` command which will bundle the files within a .zip and upload it to AWS S3. 

```language-powerbash
jake
```

*Pay special attention to the fact that there are no spaces between params.*



---



# Troubleshooting

* If you're unfamiliar with Rake, [read this tutorial](http://www.chrisjmendez.com/2016/07/31/rails-5-tasks/)
* If you want to learn more about Lambda functions, read this article on [Lambda Development](http://www.chrisjmendez.com/2017/02/19/aws-lambda-on-osx/)
* If you do not have a default AWS configuration or a profile, then read this tutorial to learn [How to configure your AWS client](http://www.chrisjmendez.com/2017/01/01/aws-working-with-aws-client/).
* If you do not have the right permissions to upload files, read this tutorial on [How to create Policy Files for S3](http://www.chrisjmendez.com/2017/03/06/aws-copy-from-one-s3-bucket-to-another/).
* If you do not have AWS client installed on your desktop computer, read [How to install AWSCLI using Homebrew](http://www.chrisjmendez.com/2017/02/18/aws-installing-aws-client-using-homebrew/) 




---



# Resources

* [Using Jake](https://howtonode.org/intro-to-jake)
* [Jake Docs](https://www.npmjs.com/package/jake)
* [Faker JS](https://github.com/marak/Faker.js/)
* [AWS JS SDK API](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/) is great if you prefer an NPM library.
* [AWS CLI Reference](http://docs.aws.amazon.com/cli/latest/reference/iam/create-user.html) is great if you prefer the command line.
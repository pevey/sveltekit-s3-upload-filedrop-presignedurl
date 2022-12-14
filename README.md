# About this repo

This is a starter template showing an example implementation of file uploads to non-public AWS S3 buckets using presigned urls. 

This example uses Prisma to store records of file uploads, TailwindCSS for styling, and the filedrop-svelte npm library for the filedrop component.

```bash
npm install
```

## Database Setup

Change the data provider below if desired
```bash
npx prisma init --datasource-provider mysql
```

Check prisma db url in .env file and update the credentials to connect.  Then push the schema from this repo to your db.
```bash
npx prisma db push
```

Check that db set up correctly.  Then, generate the ORM.
```bash
npx prisma generate
```

## AWS Setup

- Using the AWS Console, create an s3 bucket in AWS.  It can (and should) be set to block all public access. Your app will still be able to access it because it will have IAM access.
- Using the AWS Console, create an IAM user with read and write access to s3 buckets.  Be sure to save the public and private keys. You will need to enter them in the next step.
- Download and install the AWS CLI tools.  
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws configure
```
- Enter the IAM credentials you generated above when asked for by 'aws configure'
- In your SvelteKit app, add your region and bucket name to your .env file.  Replace "us-east-1" and "mybucket" with the correct values for your bucket.
```bash
S3_REGION="us-east-1"
S3_BUCKET="mybucket"
```
- Using the AWS Console, update the CORS settings for your bucket (Go to Permissions tab and scroll to the bottom) to enable uploads from users.  CORS stands for Cross-Origin Resource Sharing, and it will block uploads from users if these settings are not changed.  Use the JSON settings below.

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

## Steps to Recreate

### PLEASE NOTE
These are the steps you would take if you wanted to scaffold this example from scratch starting from create-svelte INSTEAD of cloning this repo.  This is just to help you understand exactly what the repo does so that you can do it from scratch if you prefer.  Starting from scratch is usually best, in case there are changes to the SvelteKit skeleton app.

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app

# install basic-ssl plugin for vite to provide self-signed cert for https dev environment
npm install @vitejs/plugin-basic-ssl
```

Update vite.config.js

Add this line:
```bash
import basicSsl from '@vitejs/plugin-basic-ssl';
```

Edit this line:
```bash
	plugins: [sveltekit()]
```
to this:
```bash
	plugins: [sveltekit(), basicSsl()]
```

Optional: 
Add tailwindcss using this guide: https://tailwindcss.com/docs/guides/sveltekit

```bash
npm install aws-sdk
npm install @aws-sdk/client-s3
npm install @aws-sdk/s3-presigned-post

npm install prisma --save-dev

npm install filedrop-svelte
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev -- --https

# or start the server and open the app in a new browser tab
npm run dev -- --open --https
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

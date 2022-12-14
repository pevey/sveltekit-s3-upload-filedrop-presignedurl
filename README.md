# create-svelte

Starter template showing SvelteKit integration with AWS S3 for client-side (browser) upload of files to private s3 buckets.

Also integrates Tailwind CSS, Prisma, & filedrop-svelte.

## Steps to Recreate

### PLEASE NOTE
These are the steps you would take if you were starting from scratch and NOT using this repo.  This is just to help you understand exactly what the repo does so that you can do it from scratch if you prefer.  Starting from scratch is usually best, in case there are changes to the SvelteKit skeleton app.

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app

# install basic-ssl plugin for vite to provide self-signed cert for https dev environment
npm install @vitejs/plugin-basic-ssl

# update vite.config.js
#
# add this line:
import basicSsl from '@vitejs/plugin-basic-ssl';
# edit this line:
	plugins: [sveltekit()]
# to this:
	plugins: [sveltekit(), basicSsl()]

# optional: 
# add tailwindcss using this guide: https://tailwindcss.com/docs/guides/sveltekit

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws configure

npm install aws-sdk
npm install @aws-sdk/client-s3
npm install @aws-sdk/s3-presigned-post

npm install prisma --save-dev
npx prisma init --datasource-provider mysql

# copy prisma schema file from this repo

npx prisma db pull
npx prisma generate

# install the npm library with the component we will use to drag and drop
npm install filedrop-svelte

```

- Create an IAM user in AWS with read and write access to s3 buckets
- Create an s3 bucket in AWS.  It can (and should) be set to block all public access. Your app will still be able to access it because it will have IAM access
- Update CORS on the bucket (Go to Permissions tab and scroll to the bottom) to enable uploads from users.  CORS stands for Cross-Origin Resource Sharing, and it will block uploads from users if these settings are not changed.

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


### Edit Configuration



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

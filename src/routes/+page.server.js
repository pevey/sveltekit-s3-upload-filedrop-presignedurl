import AWS from 'aws-sdk'
//import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { error } from '@sveltejs/kit'
import { S3_BUCKET } from '$env/static/private'

const s3 = new AWS.S3()

export async function GET ({ params, locals }) {
    if (!locals.authorized) { throw error(401, 'unauthorized') }
    const key = params.id
    const s3 = new AWS.S3()
    let stream = s3.getObject({ Bucket: S3_BUCKET, Key: key }).createReadStream() 
    return new Response(stream, { status: 200 })
}

export const actions = {
    presignPost: async ({ locals }) => {
        console.log('here')
        //if (!locals.authorized) { throw error(401, 'unauthorized') }
        const key = Date.now().toString()
        const params = {
            Bucket: S3_BUCKET,
            Key: key,
            Expires: 60, // expiration time in seconds
        }
        const url = await s3.getSignedUrlPromise('putObject', params)
        console.log(url)
        console.log(key)
        return { url, key }
    }
}

async function generatePresignedUrl(file) {
    const params = {
        Bucket: 'majel-docs',
        Key: file.name,
        Expires: 60, // expiration time in seconds
    }
    return await s3.getSignedUrl('putObject', params);
}
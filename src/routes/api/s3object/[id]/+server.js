import AWS from 'aws-sdk'
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import db from '$lib/db'
import { error } from '@sveltejs/kit'

import { S3_BUCKET } from '$env/static/private'

export async function GET ({ params, locals }) {
    //if (!locals.authorized) { throw error(401, 'unauthorized') }
    const key = params.id
    const s3 = new AWS.S3()
    let stream = s3.getObject({ Bucket: S3_BUCKET, Key: key }).createReadStream() 
    return new Response(stream, { status: 200 })
}

export async function DELETE ({ params, locals }) {
    //if (!locals.authorized) { throw error(401, 'unauthorized') }
    const key = params.id
    const s3 = new S3Client()
    let obj = await s3.send(new DeleteObjectCommand({ Bucket: S3_BUCKET, Key: key }))
    return new Response(obj)
}

export async function POST({ request, locals }) {
    // called after user has done presigned post.  add to db
    //if (!locals.authorized) { throw error(401, 'unauthorized') }
    const data = await request.formData()
    if (!data.get('fileName') || !data.get('fileType') || !data.get('fileSize') || !data.get('objectId')) { throw error(500, 'bad format') }
    let document
    document = await db.object.create({
        data: {
            id: data.get('objectId'),
            file_name: data.get('fileName'),
            file_size: parseInt(data.get('fileSize')),
            file_type: data.get('fileType'),
        }
    })
    try {
    } catch(error) {
        console.log(error)
    }
    if (document.id) { return new Response(document.id, { status: 200 }) }  
}
import AWS from 'aws-sdk'
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import db from '$lib/db'
import { error } from '@sveltejs/kit'

import { S3_BUCKET } from '$env/static/private'

export async function GET ({ params, locals }) {
    //if (!locals.authorized) { throw error(401, 'unauthorized') }
    //todo: add check to make sure this object belongs to the user
    const key = params.id
    const s3 = new AWS.S3()
    let stream = s3.getObject({ Bucket: S3_BUCKET, Key: key }).createReadStream() 
    return new Response(stream, { status: 200 })
}

export async function DELETE ({ params, locals }) {
    //if (!locals.authorized) { throw error(401, 'unauthorized') }
    //todo: add check to make sure this user has permission to delete this object
    //todo: remove from db
    const key = params.id
    const s3 = new S3Client()
    let obj = await s3.send(new DeleteObjectCommand({ Bucket: S3_BUCKET, Key: key }))
    return new Response(obj)
}

export async function POST({ request, locals }) {
    //if (!locals.authorized) { throw error(401, 'unauthorized') }
    // called after user has done presigned post.  
    // add object to db
    const data = await request.formData()
    if (!data.get('fileName') || !data.get('fileType') || !data.get('fileSize') || !data.get('objectId')) { throw error(500, 'bad format') }
    let document
    try {
        document = await db.object.create({
            data: {
                id: data.get('objectId'),
                file_name: data.get('fileName'),
                file_size: parseInt(data.get('fileSize')),
                file_type: data.get('fileType'),
            }
        })
    } catch (error) {
        console.log(error)
    }
    if (document.id) { return new Response(document.id, { status: 200 }) }  
}
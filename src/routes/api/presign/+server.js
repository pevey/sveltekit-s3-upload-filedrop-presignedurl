import { S3Client } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'

import { S3_BUCKET } from '$env/static/private'

export async function GET ({ url, locals }) {
    //if (!locals.authorized) { throw error(401, 'unauthorized') }

    const id = url.searchParams.get('id')
    const fileType = url.searchParams.get('fileType')

    const data = await createPresignedPost(new S3Client(), {
        Bucket: S3_BUCKET,
        Key: `${id}`,
        Conditions: [['content-length-range', 0, 52428800]],  //max of 10 mb
        Fields: {'Content-Type': fileType},
        Expires: 60000, //Seconds before the presigned post expires. 3600 by default.
    })

    return new Response(JSON.stringify(data), { status: 200 })
}


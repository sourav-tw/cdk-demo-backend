import { v4 } from 'uuid';
import {S3} from 'aws-sdk';


const s3Client = new S3();

async function handler(event: any, context: any) {
    console.log('event coming from::');
    console.log(event);
    const buckets = await s3Client.listBuckets().promise();
    return {
        statusCode: 200,
        body: 'Hello From Lambda! ' + v4() + JSON.stringify(buckets)
    }
}

export { handler }
"use server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"

const generateFileName = (bytes = 2) => crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_LOCATION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
    }
})

export async function getSignedUrlUnauthenticated(checksum: string) {  
    try {
        const putObjectCommand = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: generateFileName(),
            ChecksumSHA256: checksum,
            Metadata: {
                type: "ProfilePic"
            }
        });

        const signedUrl = await getSignedUrl(s3, putObjectCommand, {
            expiresIn: 60,
        });

        return { success: { url: signedUrl } };
    } catch (error) {
        console.error("Error generating signed URL:", error);
        return { error: "Failed to generate signed URL" };
    }
}

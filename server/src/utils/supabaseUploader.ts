import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

/**
 * Upload file to Supabase storage.
 * @param fileBuffer - The buffer of the file to upload.
 * @param originalName - The original name of the file.
 * @param bucket - The Supabase storage bucket name.
 * @returns The public URL of the uploaded file.
 */
export const uploadToSupabase = async (
  fileBuffer: Buffer,
  originalName: string,
  bucket: string
): Promise<string> => {
  try {
    const uniqueFileName = `${uuidv4()}-${originalName}`; // Create a unique file name

    // Upload the file buffer to Supabase storage
    const { error } = await supabase.storage
      .from(bucket)
      .upload(uniqueFileName, fileBuffer);

    if (error) {
      throw new Error(`Failed to upload file to Supabase: ${error.message}`);
    }

    // Get the public URL of the uploaded file
    try {
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(uniqueFileName);
      return publicUrl;
    } catch (error: any) {
      throw new Error(
        `Failed to retrieve file URL from Supabase: ${error.message}`
      );
    }
  } catch (error: any) {
    throw new Error(error.message || "Image upload failed");
  }
};

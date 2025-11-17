// api/upload-chat-image.ts
import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { imageBase64, chatId } = req.body;
    if (!imageBase64 || !chatId) return res.status(400).json({ error: "Missing fields" });

    const bytes = Buffer.from(imageBase64, "base64");
    const filename = `chat/${chatId}/${Date.now()}.jpg`;
    const blob = await put(filename, bytes, {
      access: "public",
      contentType: "image/jpeg",
      addRandomSuffix: true,
    });

    return res.status(200).json({ url: blob.url });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}


// api/cron.js
export default async function handler(req, res) {
  console.log("Cron job executed at:", new Date().toISOString());
  // Add your task logic here
  res.status(200).json({ message: "Cron job executed successfully!" });
}

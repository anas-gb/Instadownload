const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Root check
app.get("/", (req, res) => {
  res.send("Video Downloader Backend is Running.");
});

// Download endpoint
app.get("/download", async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).json({ error: "Missing video URL" });
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, {
      quality: "highestvideo",
      filter: (format) => format.container === "mp4",
    });

    res.header("Content-Disposition", `attachment; filename="video.mp4"`);

    ytdl(videoUrl, { format })
      .pipe(res);
  } catch (error) {
    console.error("Download Error:", error.message);
    res.status(500).json({ error: "Failed to process the video." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

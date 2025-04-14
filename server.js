app.get('/download', (req, res) => {
    const { platform, videoId } = req.query;

    if (!platform || !videoId) {
        return res.status(400).json({ error: 'Platform and videoId are required' });
    }

    let downloadUrl = '';

    if (platform === 'instagram') {
        // Handle Instagram video download logic (using Instagram video ID)
        downloadUrl = `https://www.instagram.com/reel/${videoId}/download`;
    } else if (platform === 'youtube') {
        // Handle YouTube video download logic (using YouTube video ID)
        downloadUrl = `https://youtube.com/shorts/${videoId}/download`;
    } else {
        return res.status(400).json({ error: 'Unsupported platform' });
    }

    // Send the download URL back
    res.json({ downloadUrl });
});

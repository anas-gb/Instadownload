document.getElementById('downloadBtn').addEventListener('click', function() {
    const videoUrl = document.getElementById('videoUrl').value;

    if (!videoUrl) {
        Swal.fire('Error', 'Please enter a video URL!', 'error');
        return;
    }

    // Show loading spinner
    document.getElementById('loadingSpinner').style.display = 'block';

    // Check if the URL is from Instagram or YouTube
    let platform = '';
    let videoId = '';

    // Instagram URL pattern
    const instagramPattern = /https:\/\/www\.instagram\.com\/reel\/([^\/?]+)/;
    const youtubePattern = /https:\/\/youtube\.com\/shorts\/([^\/?]+)/;

    if (instagramPattern.test(videoUrl)) {
        platform = 'instagram';
        videoId = videoUrl.match(instagramPattern)[1]; // Extract Instagram video ID
    } else if (youtubePattern.test(videoUrl)) {
        platform = 'youtube';
        videoId = videoUrl.match(youtubePattern)[1]; // Extract YouTube video ID
    } else {
        Swal.fire('Error', 'Unsupported URL format!', 'error');
        return;
    }

    // Send the request to the backend with the platform and video ID
    fetch(`https://instadownload-production.up.railway.app/download?platform=${platform}&videoId=${videoId}`)
        .then(response => response.json())
        .then(data => {
            // Hide loading spinner
            document.getElementById('loadingSpinner').style.display = 'none';

            if (data && data.downloadUrl) {
                Swal.fire({
                    title: 'Download Ready!',
                    text: 'Click below to download your video.',
                    icon: 'success',
                    confirmButtonText: 'Download',
                }).then(() => {
                    window.location.href = data.downloadUrl; // Actual download link from backend
                });
            } else {
                Swal.fire('Error', 'Could not process the video. Please try again!', 'error');
            }
        })
        .catch(error => {
            // Hide loading spinner
            document.getElementById('loadingSpinner').style.display = 'none';
            Swal.fire('Error', 'There was an error fetching the video. Please try again!', 'error');
            console.error('Error:', error);
        });
});

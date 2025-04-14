document.getElementById('downloadBtn').addEventListener('click', function() {
    const videoUrl = document.getElementById('videoUrl').value;

    if (!videoUrl) {
        Swal.fire('Error', 'Please enter a video URL!', 'error');
        return;
    }

    // Show loading spinner
    document.getElementById('loadingSpinner').style.display = 'block';

    // Simulating backend request to download video (replace with actual backend logic)
    setTimeout(() => {
        // Hide loading spinner
        document.getElementById('loadingSpinner').style.display = 'none';

        // Assuming backend sends a download URL after processing
        const downloadLink = "https://example.com/video_download_link.mp4"; // replace with actual backend URL

        // Show download success
        Swal.fire({
            title: 'Download Ready!',
            text: 'Click below to download your video.',
            icon: 'success',
            confirmButtonText: 'Download',
        }).then(() => {
            window.location.href = downloadLink; // simulate download
        });
    }, 2000); // Simulating network delay
});

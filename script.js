document.getElementById('downloadBtn').addEventListener('click', function() {
    const videoUrl = document.getElementById('videoUrl').value;

    if (!videoUrl) {
        Swal.fire('Error', 'Please enter a video URL!', 'error');
        return;
    }

    // Show loading spinner
    document.getElementById('loadingSpinner').style.display = 'block';

    // Send the request to the backend
    fetch(`https://instadownload-production.up.railway.app/download?url=${encodeURIComponent(videoUrl)}`)
        .then(response => response.json())  // Assuming the backend sends a JSON with download URL
        .then(data => {
            // Hide loading spinner
            document.getElementById('loadingSpinner').style.display = 'none';

            if (data && data.downloadUrl) {
                // Assuming backend sends a field 'downloadUrl'
                Swal.fire({
                    title: 'Download Ready!',
                    text: 'Click below to download your video.',
                    icon: 'success',
                    confirmButtonText: 'Download',
                }).then(() => {
                    window.location.href = data.downloadUrl;  // Actual download link from backend
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

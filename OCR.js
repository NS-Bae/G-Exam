function displayImage() 
{
    const uploadInput = document.getElementById('uploadInput');
    const uploadedImage = document.getElementById('uploadedImage');
    
    if (uploadInput.files && uploadInput.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';
        }
        
        reader.readAsDataURL(uploadInput.files[0]);
    }
}
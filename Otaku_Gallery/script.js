document.querySelectorAll('.download-btn').forEach(downloadBtn => {
    downloadBtn.addEventListener('click', function(event) {
        if (!confirm('Do you want to download this image?')) {
            event.preventDefault(); // Cancel the default action (download)
        }
    });
});


function openNav() {
    if (window.innerWidth <= 600) {
        document.getElementById("mySidebar").style.width = "100%";
      } else {
        document.getElementById("mySidebar").style.width = "250px";
      }
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

function openModal(src) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImg.src = src;
}

function closeModal() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

function scrollToTop(){
    window.scrollTo(0,0);
}


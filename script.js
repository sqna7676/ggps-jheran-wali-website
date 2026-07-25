/* ==========================================
   GGPS Jheran Wali Website
   Professional JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("GGPS Jheran Wali Website Loaded Successfully");

    /* ================= Smooth Scrolling ================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function(e){

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

    /* ================= Mobile Menu ================= */

    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.querySelector("nav");

    if(menuBtn && navMenu){

        navMenu.style.display = "none";

        menuBtn.addEventListener("click", function(){

            if(navMenu.style.display === "block"){
                navMenu.style.display = "none";
            }else{
                navMenu.style.display = "block";
            }

        });

    }

    /* ================= Auto Image Slider ================= */

    const sliderImages = [
        "assets/images/hero.jpeg",
        "assets/images/students.jpeg",
        "assets/images/gallery1.jpeg",
        "assets/images/gallery2.jpeg",
        "assets/images/gallery3.jpeg"
    ];

    let currentImage = 0;
    const slider = document.getElementById("slider-image");

    if(slider){

        setInterval(function(){

            currentImage++;

            if(currentImage >= sliderImages.length){
                currentImage = 0;
            }

            slider.src = sliderImages[currentImage];

        },3000);

    }

    /* ================= Gallery Image Viewer ================= */

    const galleryImages = document.querySelectorAll(".gallery-grid img");
    const imageViewer = document.getElementById("image-viewer");
    const largeImage = document.getElementById("large-image");
    const closeViewer = document.getElementById("close-viewer");

    galleryImages.forEach(function(img){

        img.addEventListener("click", function(){

            imageViewer.style.display = "flex";
            largeImage.src = this.src;

        });

    });

    if(closeViewer){

        closeViewer.addEventListener("click", function(){

            imageViewer.style.display = "none";
            largeImage.src = "";

        });

    }

});

/* ================= Back To Top Button ================= */

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";
topBtn.id = "topBtn";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.bottom = "20px";
topBtn.style.right = "20px";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#0d5c3a";
topBtn.style.color = "#fff";
topBtn.style.fontSize = "24px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";

window.addEventListener("scroll", function(){

    if(window.scrollY > 300){
        topBtn.style.display = "block";
    }else{
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", function(){

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});
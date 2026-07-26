// ================= MOBILE MENU TOGGLE & SMOOTH CLOSING =================
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('show');
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });

    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('show');
        }
    });
}

// ================= AUTOMATIC IMAGE SLIDER =================
const sliderImages = [
    "hero.jpeg",
    "gallery1.jpeg",
    "gallery2.jpeg",
    "gallery3.jpeg",
    "gallery4.jpeg"
];

let currentIndex = 0;
const sliderImgElement = document.getElementById('slider-image');

if (sliderImgElement) {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % sliderImages.length;
        sliderImgElement.style.opacity = 0;
        setTimeout(() => {
            sliderImgElement.src = sliderImages[currentIndex];
            sliderImgElement.style.opacity = 1;
        }, 300);
    }, 3000);
}

// ================= PASSWORDS & MANAGEMENT STORAGE =================
let passwords = {
    "admin": "admin123",
    "gallery": "gallery123",
    "nursery": "class123",
    "prep": "class123",
    "class1": "class123",
    "class2": "class123",
    "class3": "class123",
    "class4": "class123",
    "class5": "class123"
};

// پاس ورڈ ری سیٹ کرنے کا فنکشن (صرف اردو/انگریزی میں)
function resetPasswordHint(sectionKey) {
    let secretPin = prompt("پاس ورڈ ری سیٹ کرنے کے لیے ماسٹر پن (Master PIN) درج کریں: (پن: 786)");
    if (secretPin === "786") {
        let newPass = prompt("نیا پاس ورڈ درج کریں:");
        if (newPass && newPass.trim() !== "") {
            passwords[sectionKey] = newPass.trim();
            alert("پاس ورڈ کامیابی سے تبدیل/ری سیٹ ہو گیا ہے! نیا پاس ورڈ یاد رکھیں۔");
        } else {
            alert("درست پاس ورڈ نہیں لکھا گیا۔");
        }
    } else if (secretPin !== null) {
        alert("غلط ماسٹر پن! آپ پاس ورڈ ری سیٹ نہیں کر سکتے۔");
    }
}

// ================= SECURE ADMIN FILE UPLOAD LOGIC (DOWNLOADS SECTION) =================
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-upload-input');
const adminPassInput = document.getElementById('admin-pass');
const downloadContainer = document.getElementById('download-list-container');

if (uploadBtn && fileInput && adminPassInput && downloadContainer) {
    uploadBtn.addEventListener('click', () => {
        const enteredPassword = adminPassInput.value;

        if (enteredPassword !== passwords["admin"]) {
            alert("غلط پاس ورڈ! صرف ایڈمن ہی فائل اپلوڈ کر سکتا ہے۔");
            return;
        }

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const fileName = file.name;
            const fileURL = URL.createObjectURL(file);

            const newLink = document.createElement('a');
            newLink.href = fileURL;
            newLink.target = "_blank";
            newLink.className = "download-item";
            newLink.innerHTML = `📥 ${fileName} (Admin Upload)`;
            
            downloadContainer.prepend(newLink);
            alert("فائل کامیابی سے اپلوڈ ہو گئی ہے اور اب کلک کر کے دیکھی یا ڈاؤن لوڈ کی جا سکتی ہے!");
            fileInput.value = "";
            adminPassInput.value = "";
        } else {
            alert("براہ کرم پہلے کوئی فائل منتخب کریں!");
        }
    });
}

// ================= GALLERY SECURE UPLOAD LOGIC =================
const galleryUploadBtn = document.getElementById('gallery-upload-btn');
const galleryFileInput = document.getElementById('gallery-file-input');
const galleryPassInput = document.getElementById('gallery-pass');
const galleryGridContainer = document.getElementById('gallery-grid-container');

if (galleryUploadBtn && galleryFileInput && galleryPassInput && galleryGridContainer) {
    galleryUploadBtn.addEventListener('click', () => {
        const enteredPassword = galleryPassInput.value;

        if (enteredPassword !== passwords["gallery"]) {
            alert("غلط پاس ورڈ! گیلری میں تصویر اپلوڈ کرنے کی اجازت نہیں۔");
            return;
        }

        if (galleryFileInput.files.length > 0) {
            const file = galleryFileInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const newImg = document.createElement('img');
                newImg.src = e.target.result;
                newImg.alt = "Uploaded Gallery Image";
                
                newImg.addEventListener('click', () => {
                    const w = window.open("");
                    w.document.write(`<img src="${e.target.result}" style="width:100%; height:auto;" alt="Full View"/>`);
                });

                galleryGridContainer.prepend(newImg);
                alert("تصویر کامیابی سے گیلری میں اپلوڈ ہو گئی ہے!");
                galleryFileInput.value = "";
                galleryPassInput.value = "";
            }
            
            reader.readAsDataURL(file);
        } else {
            alert("براہ کرم پہلے کوئی تصویر منتخب کریں!");
        }
    });
}

document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.addEventListener('click', () => {
        const w = window.open("");
        w.document.write(`<img src="${img.src}" style="width:100%; height:auto;" alt="Full View"/>`);
    });
});

// ================= CLASS WISE STUDY MATERIAL UPLOAD LOGIC =================
function uploadClassMaterial(className) {
    const passInput = document.getElementById(`pass-${className}`);
    const fileInput = document.getElementById(`file-${className}`);
    const linksContainer = document.getElementById(`links-${className}`);

    if (passInput && fileInput && linksContainer) {
        const enteredPassword = passInput.value;

        if (enteredPassword !== passwords[className]) {
            alert("غلط پاس ورڈ! اس کلاس میں مٹریل اپلوڈ کرنے کی اجازت نہیں۔");
            return;
        }

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const fileName = file.name;
            const fileURL = URL.createObjectURL(file);

            const newLink = document.createElement('a');
            newLink.href = fileURL;
            newLink.target = "_blank";
            newLink.className = "material-link";
            newLink.innerHTML = `📚 ${fileName} (New Notes)`;
            
            linksContainer.prepend(newLink);
            alert("فائل کامیابی سے اپلوڈ ہو گئی ہے اور اب طلباء کے لیے اوپن کرنے کے قابل ہے!");
            fileInput.value = "";
            passInput.value = "";
        } else {
            alert("براہ کرم پہلے کوئی فائل منتخب کریں!");
        }
    }
}

function openDefaultMaterial(event, title) {
    event.preventDefault();
    alert(title + " کی فائل فی الحال سسٹم میں موجود نہیں ہے۔ جب ایڈمن اوپر والے اپلوڈ باکس سے اسے اپلوڈ کرے گا تو یہ یہیں سے اوپن ہوگی۔");
}
// ================= FORCE BACK TO TOP BUTTON FIX =================
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

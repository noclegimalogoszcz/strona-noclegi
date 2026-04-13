// Menadżer pętli dla galerii
const galleryContainer = document.getElementById('galleryGrid');

// Zastąpiłem kod wstawką HTML wygenerowaną z JS dla oszczędności miejsca w kodzie HTML 
// Użytkownik wspomniał o "ok. 20 zdjęciach"
if(galleryContainer) {
    for(let i = 1; i <= 20; i++) {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        
        // Skrypt próbuje wczytać zdjęcia 1.jpg, 2.jpg... bezpośrednio luźno obok plików (bez folderu img)
        // W razie braku zdjęcia (onerror) odpala poprzedniego placeholdera dla estetyki
        div.innerHTML = `
            <img src="${i}.jpg" alt="Zdjęcie obiektu ${i}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=400&sig=${i}'">
        `;
        galleryContainer.appendChild(div);
    }
}

// Aktualna data do licznika
const dateElements = document.querySelectorAll('#currentDate');
if(dateElements.length > 0) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedDate = dd + '.' + mm + '.' + yyyy;
    dateElements.forEach(el => el.textContent = formattedDate);
}

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Lightbox logic (powiększanie zdjęć)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', (e) => {
            lightboxImg.src = e.target.src;
            lightbox.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });
}

// Smooth scrolling (jeśli klikniemy w anchor-link)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active'); // schowaj menu po kliknieciu na mobile
        
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

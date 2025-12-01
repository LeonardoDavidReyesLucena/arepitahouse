/* ============================================================
   SLIDER AUTOMÁTICO AREPITAHOUSE
============================================================ */

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll(".slide");

    slides.forEach((s, i) => {
        s.classList.remove("active");
        s.classList.remove("left");

        if (i === index) {
            s.classList.add("active");
        } else if (i === index - 1 || (index === 0 && i === slides.length - 1)) {
            s.classList.add("left");
        }
    });
}

function nextSlide() {
    const slides = document.querySelectorAll(".slide");
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 4000);

document.addEventListener("DOMContentLoaded", () => {
    showSlide(0);
});

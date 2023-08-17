let sections = document.querySelector('section');
let navLinks = document.querySelector('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href* =' + id + ']').classList.add 
                ('active');
            });
        };
    });
};

const slides = document.querySelector('.slides');
let counter = 0;

function nextSlide() {
  counter++;
  if (counter >= slides.children.length) {
    counter = 0;
  }
  updateSlider();
}

function updateSlider() {
  slides.style.transform = `translateX(-${counter * 100}%)`;
}

// Automatically switch slides every 3 seconds
setInterval(nextSlide, 3000);


(function ($) {
  "use strict";

  // Initiate the wowjs
  new WOW().init();


  // Spinner
  var spinner = function () {
      setTimeout(function () {
          if ($('#spinner').length > 0) {
              $('#spinner').removeClass('show');
          }
      }, 1);
  };
  spinner();


  // Sticky Navbar
  $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
          $('.sticky-top').addClass('shadow-sm').css('top', '0px');
      } else {
          $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
      }
  });
  
  
  // Back to top button

  document.querySelector('.back-to-top').addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

  // Header carousel
  $(".header-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      items: 1,
      dots: true,
      loop: true,
      nav : true,
      navText : [
          '<i class="bi bi-chevron-left"></i>',
          '<i class="bi bi-chevron-right"></i>'
      ]
  });


  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      margin: 24,
      dots: false,
      loop: true,
      nav : true,
      navText : [
          '<i class="bi bi-arrow-left"></i>',
          '<i class="bi bi-arrow-right"></i>'
      ],
      responsive: {
          0:{
              items:1
          },
          992:{
              items:2
          }
      }
  });
  
})(jQuery);

//counter
document.addEventListener("DOMContentLoaded", function () {
const counters = document.querySelectorAll(".counter, .counter-start, .counter-end");
const speed = 200; // Adjust to control speed

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute("data-target");
        const increment = target / speed;
        let count = 0;

        const updateCounter = () => {
          count += increment;
          if (count < target) {
            entry.target.textContent = Math.ceil(count) + (entry.target.classList.contains("counter") && (target === 300 || target === 12) ? "+" : "");
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target + (entry.target.classList.contains("counter") && (target === 300 || target === 12) ? "+" : ""); // Ensure final value
          }
        };

        updateCounter();
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  },
  { threshold: 0.5 } // Trigger when 50% visible
);

counters.forEach((counter) => observer.observe(counter));
});




document.addEventListener('DOMContentLoaded', () => {
  const certificateLinks = document.querySelectorAll('.dropdown-item');

  certificateLinks.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default link behavior

          // Get the data attributes
          const title = link.getAttribute('data-title');
          const image = link.getAttribute('data-image');
          const pdf = link.getAttribute('data-pdf');

          // Redirect to the certificate.html with query parameters
          window.location.href = `certificate.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&pdf=${encodeURIComponent(pdf)}`;
      });
  });
});


const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');
const image = urlParams.get('image');
const pdf = urlParams.get('pdf');

const isMandatoryDisclosure = (title === 'Mandatory Disclosure Details')

// Dynamically update the page content
const container = document.querySelector('.certificate-container');
const titleElement = document.getElementById('certificate-title');

if (title && image && pdf) {
// Update the certificate title
titleElement.textContent = decodeURIComponent(title);

// Ensure the title shows above the image and text is updated
container.innerHTML = `
  <h3>${decodeURIComponent(title)}</h3>
  <div style="display: flex; align-items: center; flex-direction: row-reverse;">
    <img src="${decodeURIComponent(image)}" alt="${decodeURIComponent(title)}" id="certificate-image" style="margin-left: 15px;">
    <p id="download-text" style="white-space: nowrap;">Click the image to open/download the PDF file</p>
  </div>
`;

// Add click event listener to image to trigger PDF download
const certificateImage = document.getElementById('certificate-image');
const downloadText = document.getElementById('download-text');

certificateImage.addEventListener('click', function() {
  // Trigger PDF download
  const link = document.createElement('a');
  link.href = decodeURIComponent(pdf);
  link.download = decodeURIComponent(pdf).split('/').pop();  // Use the file name for download
  link.click();

  // Change text
  downloadText.textContent = "Downloading PDF...";
  setTimeout(() => {
    downloadText.textContent = "Click the image to open/download the PDF file";  // Reset text after a short time
  }, 2000);
});
}

if (title && image && pdf) {
// Update the certificate title
titleElement.textContent = decodeURIComponent(title);

// Ensure the title shows above the image and text is updated
container.innerHTML = `
  <h3>${decodeURIComponent(title)}</h3>
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
    <img src="${decodeURIComponent(image)}" alt="${decodeURIComponent(title)}" id="certificate-image" style="margin-bottom: 15px;">
    <p id="download-text" style="white-space: nowrap;">Click the image to open/download the PDF file</p>
  </div>
`;

// Add click event listener to image to trigger PDF download
const certificateImage = document.getElementById('certificate-image');
const downloadText = document.getElementById('download-text');

certificateImage.addEventListener('click', function() {
  // Trigger PDF download
  const link = document.createElement('a');
  link.href = decodeURIComponent(pdf);
  link.download = decodeURIComponent(pdf).split('/').pop();  // Use the file name for download
  link.click();

  // Change text
  downloadText.textContent = "Downloading PDF...";
  setTimeout(() => {
    downloadText.textContent = "Click the image to open/download the PDF file";  // Reset text after a short time
  }, 2000);
});
}

const videoContainer = document.getElementById('video-container');
if (isMandatoryDisclosure) {
videoContainer.classList.remove('d-none');
videoContainer.classList.add('d-block');
} else {
videoContainer.classList.add('d-none');
}
const btnLogin = document.getElementById("btn_login");

btnLogin.addEventListener("click",(e) => {
    e.preventDefault();
    window.location.href = "sign_in.html";
})

const loggedIn = getCookie('loggedIn');
if(loggedIn){
    const email = loggedIn.split('=')[1];
    btnLogin.innerText = 'Logout';

    btnLogin.addEventListener('click', () => {
        document.cookie = 'loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        btnLogin.innerText = 'Login';
    });
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
// slide js
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const slideshow = document.querySelector('.slideshow');
  let slideIndex = 0;
  let slides_2 = slideshow.querySelectorAll('.box');
  const slides = slideshow.querySelectorAll('.box');
  let isMobile = false;
  prevBtn.addEventListener('click', e => {
    e.preventDefault();
   
    if (slideIndex > 0) {
      slideIndex--;
      showSlides();
    }else if(slideIndex == 0){
      slideIndex = slides.length - 3;
      showSlides();
    }
  });
  nextBtn.addEventListener('click', e => {
    e.preventDefault();
    
    if (slideIndex < slides.length - 3) {
      slideIndex++;
      showSlides();
    }else if(slideIndex >= slides.length -3){
      slideIndex = 0;
      showSlides();
    }
  });
  
  
  // Check screen size
  if (window.innerWidth <= 768) {
    isMobile = true;
    showSlides_2();
    slideshow.addEventListener('click', handleClick);
  } else {
    isMobile = false;
    showSlides();
  }
  
  // Remove click event if screen size is larger than 768
  function removeClickEvent() {
    slideshow.removeEventListener('click', handleClick);
  }
  
  // Add click event if screen size is less than or equal to 768
  function addClickEvent() {
    slideshow.addEventListener('click', handleClick);
  }
  
  // Click event handler
  function handleClick(e) {
    e.preventDefault();
    if (slideIndex == slides_2.length - 1) {
      slideIndex = 0;
      showSlides_2();
    } else {
      slideIndex++;
      showSlides_2();
    }
  }
  
  // Function to show slides
  function showSlides() {
    const slides = slideshow.querySelectorAll('.box');
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    
    for (let i = slideIndex; i < slideIndex + 3; i++) {
      if (slides[i]) {
        slides[i].style.display = 'block';
      }
    }
  }
 
 
  // Function to show slides for mobile
  function showSlides_2() {
    for (let i = 0; i < slides_2.length; i++) {
      slides_2[i].style.display = 'none';
    }
    slides_2[slideIndex].style.display = 'block';
  }
  
  // Add event listener to window resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && isMobile) {
      slideIndex = 0;
      removeClickEvent();
      isMobile = false;
      showSlides();
      
      
    } else if (window.innerWidth <= 768 && !isMobile) {
      addClickEvent();
      isMobile = true;
      showSlides_2();
    }
  });
  

function slides({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          slidesTotal = document.querySelector(totalCounter),
          slidesCurrent = document.querySelector(currentCounter),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),   
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let index = 1,
        offset = 0;

    if (slides.length < 10) {
        slidesTotal.textContent = `0${slides.length}`;
        slidesCurrent.textContent = `0${index}`;
    } else {
        slidesTotal.textContent = slides.length;
        slidesCurrent.textContent = index;
    }

    slidesField.style.width = `${100 * slides.length}%`;
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {   
        slide.style.width = width; 
    });

    slider.style.position = 'relative';
 
    const dots = document.createElement('ol'),
          dotsArr = [];

    dots.classList.add('carousel-indicators');

    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsArr.push(dot);
    }

    next.addEventListener('click', function () {
        if (offset == +width.replace(/\D/g, '') * (slides.length - 1)){
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }
        slidesField.style.transform = `translateX(-${offset}px)`;  

        if (index == slides.length){
            index = 1;
        } else {
            index++;
        }

        setCurrentSlide();

        dotsArr.forEach(dot => dot.style.opacity = '.5');
        dotsArr[index - 1].style.opacity = 1;
    });

    prev.addEventListener('click', function () {
        if (offset == 0){
            offset = +width.replace(/\D/g, '') * (slides.length - 1);  
        } else {
            offset -= +width.replace(/\D/g, '');
        }
        slidesField.style.transform = `translateX(-${offset}px)`; 

        if (index == 1){
            index = slides.length;
        } else {
            index--;
        }

        setCurrentSlide();
        dotsArr.forEach(dot => dot.style.opacity = '.5');
        dotsArr[index - 1].style.opacity = 1;
    });

    dotsArr.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const moveTo = event.target.getAttribute('data-slide-to');

            index = moveTo;
            offset = +width.replace(/\D/g, '') * (moveTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            setCurrentSlide();
            dotsArr.forEach(dot => dot.style.opacity = '.5');
            dotsArr[index - 1].style.opacity = 1;

        });
    });

    function setCurrentSlide() {
        if (slides.length < 10){
            slidesCurrent.textContent = `0${index}`;
        } else {
            slidesCurrent.textContent = index;
        }
    }
}

export default slides;
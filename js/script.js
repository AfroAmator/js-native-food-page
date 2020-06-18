document.addEventListener('DOMContentLoaded', () => {

    'use strict';

    /////////////////////Tabs////////////////////////////////
    const tabContent = document.querySelectorAll('.tabcontent'),
         tabParent = document.querySelector('.tabheader__items'),
        tab = tabParent.querySelectorAll('.tabheader__item');

    function hideTabContent() {
        tabContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tab.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }
    hideTabContent();

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tab[i].classList.add('tabheader__item_active');
    }
    showTabContent();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList == 'tabheader__item') {
            tab.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //////////////////Timer///////////////////////

    const dateEnd = ('2020-07-02');

    function setTimer(dat) {
        const timerWorkTime = Date.parse(dat) - new Date(),
            days = Math.floor(timerWorkTime / (1000 * 60 * 60 * 24)),
            hours = Math.floor((timerWorkTime / (1000 * 60 * 60)) % 24),
            minutes = Math.floor(timerWorkTime / (1000 * 60) % 60),
            seconds = Math.floor((timerWorkTime / 1000) % 60);

        return {
            timerWorkTime,
            days,
            hours,
            minutes,
            seconds,
        };
    }

    function zeroAdding(number) {
        if (number >= 0 && number <= 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const timeUpdate = setTimer(endtime);

            days.innerHTML = zeroAdding(timeUpdate.days);
            hours.innerHTML = zeroAdding(timeUpdate.hours);
            minutes.innerHTML = zeroAdding(timeUpdate.minutes);
            seconds.innerHTML = zeroAdding(timeUpdate.seconds);

            if (timer.timerWorkTime <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock('.timer', dateEnd);

    //////////////////////Modal////////////////////////////////

    const modalOpenTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');


    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalOpenTrigger.forEach((item) => {
        item.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 100000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    ///////////////////Classes/////////////////////////
    class MenuCard {
        constructor(img, alt, menu, describe, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.menu = menu;
            this.describe = describe;
            this.price = this.currencyConverter(price, 27);
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }

        currencyConverter(usd, usdToUah) {
            return usd * usdToUah;
        }

        createCard() {
            const elem = document.createElement('div');

            if (this.classes.length === 0) {
                this.elem = 'menu__item';
                elem.classList.add(this.elem);
            } else {
                this.classes.forEach(className => elem.classList.add(className));
            }

            elem.innerHTML = `
                    <img src=${this.img} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.menu}</h3>
                    <div class="menu__item-descr">${this.describe}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
            this.parent.append(elem);
        }
    }

    const getSomeData = async (url) => {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getSomeData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').createCard();
            });
        });

    /////////////////////request/////////////////////

    const forms = document.querySelectorAll('form');

    const massage = {
        load: 'img/formload/spinner.svg',
        succes: 'succes',
        failure: 'fail',
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data,
        });
        
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = massage.load;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            
           const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(massage.succes);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(massage.failure);
            }).finally(() => {
                form.reset();
            });

          
        });
    }

    function showThanksModal(message) {
        const prevModalWindow = document.querySelector('.modal__dialog');

        prevModalWindow.classList.add('hide');
        openModal();

        const newModalWindow = document.createElement('div');
        newModalWindow.classList.add('modal__dialog');
        newModalWindow.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        
        document.querySelector('.modal').append(newModalWindow);
        setTimeout(()=> {
            newModalWindow.remove();
            prevModalWindow.classList.add('show'); 
            prevModalWindow.classList.remove('hide');
            closeModal();

        }, 4000);
    }

    //////////////////////////slides/////////////////////////

    let index = 1;
    const slide = document.querySelectorAll('.offer__slide'),
          slidesTotal = document.querySelector('#total'),
          slidesCurrent = document.querySelector('#current'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next');

    showSlides();

        
    if (slide.length < 10) {
        slidesTotal.textContent = `0${slide.length}`;
    } else {
        slidesTotal.textContent = slide.length;
    }

    function showSlides() {        
        if (index > slide.length) {
            index = 1;
        }
        if (index < 1) {
            index = slide.length;
        }
       
        slide.forEach(item =>{
            item.classList.add('hide');
        });
      
        slide[index - 1].classList.add('show');
        slide[index - 1].classList.remove('hide');

        if (index < 10) {
            slidesCurrent.textContent = `0${index}`;
        } else {
            slidesCurrent.textContent = index;
        }
    }

    function plussSlides (i) {
        showSlides(index += i);
    }
    
    prev.addEventListener('click', function(){
        plussSlides(-1);
    });

    next.addEventListener('click', function(){
        plussSlides(1);
    });
});
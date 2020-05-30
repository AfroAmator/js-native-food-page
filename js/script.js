document.addEventListener('DOMContentLoaded', () => {

    'use strict';

    /////////////////////Tabs////////////////////////////////
    const tabContent = document.querySelectorAll('.tabcontent'),
        tabParent = document.querySelector('.tabheader__items'),
        tab = tabParent.querySelectorAll('.tabheader__item');

    function hideTabContent() {
        tabContent.forEach((item) => {
            item.style.display = 'none';

        });
        tab.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }
    hideTabContent();

    function showTabContent(i = 0) {
        tabContent[i].style.display = 'block';
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

    const dateEnd = '2020-06-01';

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
          modal = document.querySelector('.modal'),
          modalCloseTrigger = document.querySelector('.modal__close');

 
    function openModal() {
        modal.style.display ='block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
 
    modalOpenTrigger.forEach( (item) => {
        item.addEventListener('click',openModal);
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    modalCloseTrigger.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 10000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    
    window.addEventListener('scroll', showModalByScroll);

     ///////////////////Classes/////////////////////////
    class MenuCard {
        constructor(img, alt, menu, describe, price, parentSelector, ...classes)  {
            this.img = img;
            this.alt = alt;
            this.menu = menu;
            this.describe = describe;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }

        createCard() {
            const elem = document.createElement('div');

            if (this.classes.length === 0) {
                this.elem ='menu__item';
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

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu .container',
        'menu__item',
    ).createCard();
  
    new MenuCard(
        "img/tabs/elite.jpg",
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        '.menu .container',
        'menu__item',
    ).createCard();
   
    new MenuCard(
        "img/tabs/post.jpg",
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        '.menu .container',
        'menu__item',
    ).createCard();
    
});

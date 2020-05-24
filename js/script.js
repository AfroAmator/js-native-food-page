document.addEventListener('DOMContentLoaded', () => {

    'use strict';

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

});
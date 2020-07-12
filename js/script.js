'use strict';
import calculator from './modules/calculator';
import cards from './modules/cards';
import modal from './modules/modal';
import request from './modules/request';
import slides from './modules/slides';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';


document.addEventListener('DOMContentLoaded', () => {
    
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

    calculator();
    cards();
    modal('[data-modal]', '.modal', modalTimerId);
    request('form', modalTimerId);
    slides({
        container: '.offer__slider', 
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next', 
        prevArrow: '.offer__slider-prev', 
        totalCounter: '#total', 
        currentCounter: '#current', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner',
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2020-12-31');
});
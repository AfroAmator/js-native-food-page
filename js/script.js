"use strict";

document.addEventListener('DOMContentLoaded', () => {

const tabsParent = document.querySelector('.tabheader__items'),
      tabs = tabsParent.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent');
          
function hideTabsContent() {
    tabsContent.forEach( content => {
        content.style.display = 'none';
    });

    tabs.forEach( tab => {
        tab.classList.remove('tabheader__item_active');
    });
}

function showTabContent(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
}

hideTabsContent();
showTabContent();


tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    
    if ( target && target.classList.contains('tabheader__item') ) {
       tabs.forEach((item, i) => {
            if (target == item) {
                hideTabsContent();
                showTabContent(i);  
            }
       });
    }

});

});
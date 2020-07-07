function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    /////////////////////Tabs////////////////////////////////
    const tabContent = document.querySelectorAll(tabsContentSelector),
        tabParent = document.querySelector(tabsParentSelector),
        tab = tabParent.querySelectorAll(tabsSelector);

    function hideTabContent() {
        tabContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tab.forEach((item) => {
            item.classList.remove(activeClass);
        });
    }
    hideTabContent();

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tab[i].classList.add(activeClass);
    }
    showTabContent();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList == tabsSelector.slice(1)) {
            tab.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}

export default tabs;
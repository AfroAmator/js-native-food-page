import {getSomeData} from '../services/services';

function cards() {
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

    getSomeData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').createCard();
            });
        });
}

export default cards;
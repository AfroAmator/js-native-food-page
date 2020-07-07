import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function request(formSelector, modalTimerId) {

    const forms = document.querySelectorAll(formSelector);

    const massage = {
        load: 'img/formload/spinner.svg',
        succes: 'succes',
        failure: 'fail',
    };

    forms.forEach(item => {
        bindPostData(item);
    });

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
        openModal('.modal', modalTimerId);

        const newModalWindow = document.createElement('div');
        newModalWindow.classList.add('modal__dialog');
        newModalWindow.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(newModalWindow);
        setTimeout(() => {
            newModalWindow.remove();
            prevModalWindow.classList.add('show');
            prevModalWindow.classList.remove('hide');
            closeModal('.modal');

        }, 4000);
    }
}

export default request;
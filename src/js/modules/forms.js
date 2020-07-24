import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const forms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

    const message = {
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        loading: 'Загрузка...',
        failure: 'Что-то пошло не так...'
    }

    checkNumInputs('input[name="user_phone"]');

    const clearInputs = () => {
        inputs.forEach(input => {
            input.value = '';
        })
    }
    
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;

        const res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.appendChild(statusMessage);

            const formData = new FormData(form);
            if (form.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(() => statusMessage.textContent = message.success)
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => statusMessage.remove(), 3000);
                });
        })
    })
};

export default forms;
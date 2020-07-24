"use strict";

const modals = (state) => {
    function bindModal(triggerSelector, closeSelector, modalSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              close = document.querySelector(closeSelector),
              modal = document.querySelector(modalSelector),
              windows = document.querySelectorAll('[data-modal]')

        trigger.forEach(item => {
            let event = item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

				if (modal.classList.contains('popup_calc_profile')) {
					if (!state.form || !state.width || !state.height) {
						event.removeEventListener();
					}
                }
                
				if (modal.classList.contains('popup_calc_end')) {
					if (!state.type || !state.profile) {
						event.removeEventListener();
					}
				}

                windows.forEach(item => {
                    item.style.display = 'none';
                })

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        })

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            })
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
        }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer .popup_close', '.popup_engineer');
    bindModal('.phone_link', '.popup .popup_close', '.popup');
    bindModal('.popup_calc_btn', '.popup_calc_close', '.popup_calc');
    bindModal('.popup_calc_button', '.popup_calc_profile_close', '.popup_calc_profile', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end_close', '.popup_calc_end', false)
    showModalByTime('.popup', 60000);
};

export default modals;
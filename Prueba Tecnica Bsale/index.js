'use strict';

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

const form = document.querySelector('[data-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const inputName = document.querySelector('[data-name]');
    const name = inputName.value;
    const inputEmail = document.querySelector('[data-email]');
    const email = inputEmail.value;
    const inputText = document.querySelector('[data-text]');
    const text = inputText.value;
    if(name === '' || email === '' || text === '') {
        if(name === '') {
            inputName.classList.add('is-invalid');
            inputName.focus();
            verificar(inputName);
        } else if(email === '') {
            inputEmail.classList.add('is-invalid');
            inputEmail.focus();
            verificar(inputEmail);
        } else if(text === '') {
            inputText.classList.add('is-invalid');
            inputText.focus();
            verificar(inputText);
        };
    } else {
        Swal.fire({
            title: 'Está seguro?',
            text: "Se enviará el mensaje!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            confirmButtonText: 'Sí, Enviar!'
        }).then((result) => {
            if (result.isConfirmed) {
                let timerInterval
                Swal.fire({
                title: 'Enviando...',
                html: 'Un momento por favor.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
                }).then( async (result) => {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Mensaje enviado!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    location.reload();
                });
            };
        });
    };
});

const verificar = (input) => {
    input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
    });
};
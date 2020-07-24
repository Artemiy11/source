const checkNumInputs = (selector) => {
    const num = document.querySelectorAll(selector);

    num.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, "");
        })
    })
};  

export default checkNumInputs;
export const checkForm = (buttonElement, nameInputElement, textInputElement) => {
    buttonElement.disabled = true;
    nameInputElement.addEventListener('input', () => {
    if ((nameInputElement.value === '')||(textInputElement.value === '')){
        buttonElement.disabled = true;
        return;
    } else {
        buttonElement.disabled = false;
        return;
    }
    });
    
    buttonElement.disabled = true;
    textInputElement.addEventListener('input', () => {
    if ((textInputElement.value === '')||(nameInputElement.value === '')){
        buttonElement.disabled = true;
        return;
    } else {
        buttonElement.disabled = false;
        return;
    }
    });
}
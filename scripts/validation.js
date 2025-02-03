const showInputError = (fromEl, inputEl, errorMessage) => {
  const errorMsgEl = document.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMessage;
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
  }
};

const setEventListeners = (formEl) => {
  const inputList = formEl.querySelectorAll(".modal__input");
  const buttonElement = formEl.querySelector(".modal__submit-button");

  // toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement);
      // toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((fromEl) => {
    setEventListeners(fromEl);
  });
};

enableValidation();

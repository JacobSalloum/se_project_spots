import "./index.css";

import {
  enableValidation,
  settings,
  disableButton,
  resetValidation,
} from "../scripts/validation.js";
// images
import spotsLogoSrc from "../images/spots.logo.svg";
import profileAvatarSrc from "../images/spots.avatar.jpg";
import editPencilIconSrc from "../images/spots.edit.svg";
import plusIconSrc from "../images/plus.icon.svg";
import editPencilLightIconSrc from "../images/spots.edit.light.png";

import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";

const spotsLogo = document.getElementById("spots-logo");
spotsLogo.src = spotsLogoSrc;

const profileAvatar = document.getElementById("profile-avatar");
profileAvatar.src = profileAvatarSrc;

const editPencilIcon = document.getElementById("profile-pencil-icon");
editPencilIcon.src = editPencilIconSrc;
const profileAvatarPencil = document.getElementById(
  "profile-avatar-pencil-icon"
);
profileAvatarPencil.src = editPencilLightIconSrc;

const plusIcon = document.getElementById("plus-icon");
plusIcon.src = plusIconSrc;

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
// ];

const modalList = document.querySelectorAll(".modal");

// Profile
const profileEditButton = document.querySelector(".profile__edit-button");
const profileNname = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editFormElement = document.forms["edit-profile-form"];
const editModalNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editModalDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");

// Card
const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");

const cardModal = document.querySelector("#add-card-modal");
const cardAddButton = document.querySelector(".profile__add-button");
const addCardForm = document.forms["add-card-form"];
const cardLikeButton = document.querySelector(".card__like-button");

// Add card
const addCardLinkInput = cardModal.querySelector("#add-card-link-input");
const addCardNameInput = cardModal.querySelector("#add-card-name-input");
const submitButton = cardModal.querySelector(".modal__submit-button");

// Preview modal
const previewModal = document.querySelector("#preview__modal");
const previewModalImg = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

// Avatar
const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarForm = document.forms["modal-avatar-form"];
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-button");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

// Dekete
const deleteModal = document.querySelector("#delete-card-modal");
const deleteForm = document.forms["modal-delete-form"];

// Close Buttons
const closeButtons = document.querySelectorAll(".modal__close-button");
const outterModalCloseButtons = document.querySelectorAll(
  ".modal__outter_close-button"
);
const cancelButton = document.querySelector(".modal__cancel-button");

let selectedCard;
let selectedCardId;
let userId;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e11ddd60-2205-47cc-82fc-4d65d6c884b9",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    userId = userInfo._id;
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardList.prepend(cardElement);
    });

    profileAvatar.src = userInfo.avatar;
    profileNname.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
  })
  .catch(console.error);

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

outterModalCloseButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImgEl = cardElement.querySelector(".card__image");

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  const isLiked = data.isLiked;
  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_liked");
  }

  cardNameEl.textContent = data.name;
  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;

  cardImgEl.addEventListener("click", () => {
    openModal(previewModal);

    previewModalImg.src = data.link;
    previewModalCaption.textContent = data.name;
    previewModalImg.alt = data.name;
  });

  cardLikeButton.addEventListener("click", (evt) => {
    handleLike(evt, data._id);
  });

  cardDeleteButton.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data._id);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapePress);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapePress);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Delete", "Deleting...");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false, "Delete");
    });
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      profileNname.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  const cardData = {
    name: addCardNameInput.value,
    link: addCardLinkInput.value,
  };
  api
    .addCard(cardData)
    .then((newCard) => {
      const cardElement = getCardElement(newCard);
      cardList.prepend(cardElement);
      addCardForm.reset();
      disableButton(submitButton, settings);
      closeModal(cardModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleLike(evt, id) {
  // evt.target.classList.toggle("card__like-button_liked");
  const isLiked = evt.target.classList.contains("card__like-button_liked");

  api
    .changeLikeStatus(id, isLiked)
    .then((data) => {
      evt.target.classList.toggle("card__like-button_liked");
    })
    .catch(console.error);
}

function handleEscapePress(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileNname.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(
    [editModalNameInput, editModalDescriptionInput],
    editFormElement
  );
  openModal(editProfileModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);

//initalCards.forEach was here

cardAddButton.addEventListener("click", () => {
  openModal(cardModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

profileAvatarBtn.addEventListener("click", () => {
  openModal(avatarModal);
});
avatarForm.addEventListener("submit", handleAvatarSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

modalList.forEach((modal) => {
  modal.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

modalList.forEach((modal) => {
  cancelButton.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal__cancel-button")) {
      closeModal(modal);
    }
  });
});

enableValidation(settings);

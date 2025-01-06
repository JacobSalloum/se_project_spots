const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const profileNname = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editFormElement = editProfileModal.querySelector(".modal__form");
const editModalCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editModalNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editModalDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");

const cardModal = document.querySelector("#add-card-modal");
const cardModalCloseButton = cardModal.querySelector(".modal__close-button");
const cardAddButton = document.querySelector(".profile__add-button");
const addCardForm = cardModal.querySelector(".modal__form");

const addCardLinkInput = cardModal.querySelector("#add-card-link-input");
const addCardNameInput = cardModal.querySelector("#add-card-name-input");

function getCradElemnt(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImgEl = cardElement.querySelector(".card__image");
  cardNameEl.textContent = data.name;
  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileNname.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editProfileModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: addCardNameInput.value,
    link: addCardLinkInput.value,
  };
  const cardElement = getCradElemnt(inputValues);
  cardList.prepend(cardElement);
  closeModal(cardModal);
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileNname.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

editModalCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);

initialCards.forEach((item) => {
  const cardElement = getCradElemnt(item);
  cardList.prepend(cardElement);
});

cardAddButton.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseButton.addEventListener("click", () => {
  closeModal(cardModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

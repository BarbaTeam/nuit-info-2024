const MODAL         = document.getElementById("modal");
const MODAL_TITLE   = document.getElementById("modal-title");
const MODAL_CONTENT = document.getElementById("modal-content");

const CLOSE_MODAL_BTN = document.getElementById("close-modal-button");

const OVERLAY = document.getElementById("overlay");


/*export*/ function openModal(modal_body = {
  "modal_header": "Blank Modal",
  "modal_content": "No Content"
}) {
  /*Must be explicitly called.*/
  MODAL_TITLE.innerText  = modal_body["modal_header"];
  MODAL_CONTENT.innerText = modal_body["modal_content"];

  MODAL.classList.add('active');
  OVERLAY.classList.add('active');
}

function closeModal() {
  MODAL.classList.remove('active');
  OVERLAY.classList.remove('active');
}


CLOSE_MODAL_BTN.addEventListener("click", closeModal);
OVERLAY.addEventListener('click', closeModal);
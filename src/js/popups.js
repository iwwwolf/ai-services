function openPopup(popupId) {
  // Закрыть все модальные окна
  const popups = document.querySelectorAll('.popup.is-active');
  
  popups.forEach(popup => {
    popup.classList.remove('is-active');
  });

  // Открыть нужное модальное окно
  const popup = document.getElementById(popupId);

  if (popup) {
    popup.classList.add('is-active');
  }
}

document.addEventListener('click', function(event) {
  
  const popupId = event.target.dataset.popupId;
  const modalBackdrop = event.target.closest('.popup__backdrop, .popup__close');

  console.log('====================================');
  console.log(event.target);
  console.log('====================================');
  
  if (popupId) {
    event.preventDefault()
  
    openPopup(popupId);
  }

  if (modalBackdrop) {
    const parentPopup = modalBackdrop.closest('.popup');

    parentPopup.classList.remove('is-active');
  }

  return;
});

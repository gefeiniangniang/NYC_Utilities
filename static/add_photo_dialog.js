const initAddPhotoDialog = () => {
  const addPhotoDialogCloseButton = document.getElementById('add_photo_close');
  const addPhotoDialogContainer = document.getElementsByClassName('add_photo_dialog_container')[0];
  addPhotoDialogCloseButton.addEventListener('click', () => {
    addPhotoDialogContainer.style.display = 'none';
  });

  const addPhotoDialogSubmit = document.getElementById('add_photo_submit');
  addPhotoDialogSubmit.addEventListener('click', () => {
    addPhotoDialogContainer.style.display = 'none';
  });
}
const initAddLocationDialog = () => {
  const addLocationDialogCloseButton = document.getElementById('add_location_close_icon');
  const addLocationDialogContainer = document.getElementsByClassName('add_location_dialog_container')[0];
  addLocationDialogCloseButton.addEventListener('click', () => {
    addLocationDialogContainer.style.display = 'none';
  });

  const addLocationDialogSubmit = document.getElementById('add_location_submit');
  addLocationDialogSubmit.addEventListener('click', () => {
    addLocationDialogContainer.style.display = 'none';
  });

  const addLocationPhoto = document.getElementById('add_location_photo');
  const addPhotoDialogContainer = document.getElementsByClassName('add_photo_dialog_container')[0];
  addLocationPhoto.addEventListener('click', () => {
    addPhotoDialogContainer.style.display = 'block';
  });
}
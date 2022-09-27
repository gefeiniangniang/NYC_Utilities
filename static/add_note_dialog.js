const initAddNoteDialog = () => {
  const addNoteDialogCloseButton = document.getElementById('add_note_close');
  const addNoteDialogContainer = document.getElementsByClassName('add_note_dialog_container')[0];
  addNoteDialogCloseButton.addEventListener('click', () => {
    addNoteDialogContainer.style.display = 'none';
  });

  const addNoteDialogSubmit = document.getElementById('add_note_submit');
  addNoteDialogSubmit.addEventListener('click', () => {
    addNoteDialogContainer.style.display = 'none';
  });
}
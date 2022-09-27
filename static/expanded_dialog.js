const initExpandedDialog = (locationId, expandedDialogContainer) => {
    //-------------------------------------------
    // HELPER FUNCTIONS
    //-------------------------------------------
    const changeTabView = pageToView => {
        const expandedDialog = expandedDialogContainer.getElementsByClassName('expanded_dialog')[0];
        expandedDialog.className = expandedDialog.className.replace(/ .*open/, ` ${pageToView}_open`)

        const tabs = expandedDialogContainer.getElementsByClassName('expanded_dialog_tab');
        let tabSettings;

        if (pageToView == 'info') {
            tabSettings = [0, 1, 2, 3];
        } else if (pageToView == 'ratings') {
            tabSettings = [1, 0, 1, 2];
        } else if (pageToView == 'photos') {
            tabSettings = [2, 1, 0, 1];
        } else {
            tabSettings = [3, 2, 1, 0];
        }

        Array.from(tabs).forEach((tab, i) => {
            const tabLevel = tabSettings[i];
            tab.className = tab.className.replace(/ tab_level_[0-3]/, ` tab_level_${tabLevel}`);
        });
    };

    const changePhotoOverlay = (photoId, display) => {
        const photoOverlays = expandedDialogContainer.getElementsByClassName('expanded_dialog_photo_overlay');
        const photoOverlay = Array.from(photoOverlays).find(photo => photo.getAttribute('photo-id') == photoId);
        photoOverlay.style.display = display;
    };

    const openSelectedNote = (selectedNote, note) => {
        selectedNote.style.display = 'block';
        note.className += ' hidden';
    };

    const closeSelectedNote = (selectedNote, note) => {
        selectedNote.style.display = 'none';
        note.className = note.className.replace(' hidden', '');
    };

    const toggleFavorite = async id => {
        const response = await fetch(`${window.location.origin}/expanded_dialog/toggle_favorite`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
            }),
        });

        const json = await response.json();

        const favorite = expandedDialogContainer.getElementsByClassName('expanded_dialog_favorite')[0];

        if (json.is_favorite) {
            if (favorite.className.indexOf(' is_favorite') == -1) {
                favorite.className += ' is_favorite';
            }
        } else {
            favorite.className = favorite.className.replace(' is_favorite', '');
        }
    };

    //-------------------------------------------
    // ADDING EVENT LISTENERS
    //-------------------------------------------

    const openAddNoteDialogButton = expandedDialogContainer.getElementsByClassName('expanded_dialog_add_note_button')[0];
    const addNoteDialogContainer = document.getElementsByClassName('add_note_dialog_container')[0];
    openAddNoteDialogButton.addEventListener('click', () => {
        addNoteDialogContainer.style.display = 'block';
    });

    const openAddPhotoDialogButton = expandedDialogContainer.getElementsByClassName('expanded_dialog_add_photo_button')[0];
    const addPhotoDialogContainer = document.getElementsByClassName('add_photo_dialog_container')[0];
    openAddPhotoDialogButton.addEventListener('click', () => {
        addPhotoDialogContainer.style.display = 'block';
    });

    const expandedDialogCloseButton = expandedDialogContainer.getElementsByClassName('expanded_dialog_close')[0];
    const feedback = expandedDialogContainer.getElementsByClassName('expanded_dialog_feedback')[0];
    expandedDialogCloseButton.addEventListener('click', () => {
        expandedDialogContainer.style.display = 'none';
        feedback.style.opacity = 1; // make sure feedback shows if we reopen the dialog
    });

    // TODO: Associated the expanded dialog to proper basic location dialog
    const basicLocationHeaders = document.getElementsByClassName('basic_location_header');
    Array.from(basicLocationHeaders).forEach(header => {
        if (header.getAttribute("location-id") == locationId) {
            header.addEventListener('click', () => {
                expandedDialogContainer.style.display = 'block';
            });
        }
    })

    const feedbackButtons = expandedDialogContainer.getElementsByClassName('expanded_dialog_feedback_button');

    Array.from(feedbackButtons).forEach(button => {
        button.addEventListener('click', () => {
            feedback.style.opacity = 0;
        });
    });

    const tabs = expandedDialogContainer.getElementsByClassName('expanded_dialog_tab');
    Array.from(tabs).forEach(tab => {
        const tabName = tab.getAttribute('tab-id');
        tab.addEventListener('click', () => {
            changeTabView(tabName);
        });
    });

    const photos = expandedDialogContainer.getElementsByClassName('expanded_dialog_photo');
    Array.from(photos).forEach(photo => {
        const photoId = photo.getAttribute('photo-id');
        photo.addEventListener('click', () => {
            changePhotoOverlay(photoId, 'block');
        });
    });

    const photoOverlayCloseButtons = expandedDialogContainer.getElementsByClassName('expanded_dialog_photo_overlay_close_button');
    Array.from(photoOverlayCloseButtons).forEach(button => {
        const photoId = button.getAttribute('photo-id');
        button.addEventListener('click', () => {
            changePhotoOverlay(photoId, 'none');
        });
    });

    const notes = expandedDialogContainer.getElementsByClassName('expanded_dialog_note');
    /*
        the selected note (sn) of a given note (n) precedes it in the DOM tree

                        note container
                             |
          _______________________________________
         /       /       |       |       \       \
        sn      n       sn       n       sn       n
    */
    Array.from(notes).forEach((note, i) => {
        if (note.className.indexOf('selected') == -1) {
            note.addEventListener('click', () => {
                const selectedNote = notes[i - 1];
                openSelectedNote(selectedNote, note);
                setTimeout(() => {
                document.body.addEventListener('click', tempFunc = e => {
                    if (e.target != selectedNote) {
                        closeSelectedNote(selectedNote, note);
                        e.currentTarget.removeEventListener('click', tempFunc);
                    }
                });
                }, 500);
            });
        }
    });

    const favorite = expandedDialogContainer.getElementsByClassName('expanded_dialog_favorite')[0];
    favorite.addEventListener('click', () => {
        toggleFavorite(locationId);
    });
};

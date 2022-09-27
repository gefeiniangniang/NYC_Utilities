onDocumentLoaded = () => {
    console.log('page loaded!');

    initAddNoteDialog()
    initAddPhotoDialog()
    initAddLocationDialog()
    initSettings()

    expandedDialogs = document.getElementsByClassName('expanded_dialog_container')
    Array.from(expandedDialogs).forEach(dialog => {
        const locationId = dialog.getAttribute('location-id');
        console.log(locationId);
        initExpandedDialog(locationId, dialog)
    });

    const hamburger = document.getElementById("hamburger");
    const settingsContainer = document.getElementsByClassName("settings_container")[0];
    hamburger.addEventListener('click', () => {
        settingsContainer.style.display = "block";
    })
};

$(document).ready(onDocumentLoaded)

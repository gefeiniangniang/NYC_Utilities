const initSettings = () => {
  const accessibilityButtons = document.getElementsByClassName("settings_icon");

  const settingsCloseButton = document.getElementById('settings_close');
  const settingsContainer = document.getElementsByClassName('settings_container')[0];
  settingsCloseButton.addEventListener('click', () => {
    settingsContainer.style.display = 'none';
  });

  const addLocationButton = document.getElementById('add_location_button');
  const addLocationContainer = document.getElementsByClassName('add_location_dialog_container')[0];
  addLocationButton.addEventListener('click', () => {
    addLocationContainer.style.display = 'block';
  });

  const logoutButton = document.getElementById('settings_logout_button');
  const loginButton = document.getElementById('settings_login_button');

  const toggleAccessibility = async(accessId) => {
    const response = await fetch(`${window.location.origin}/preferences/toggle/${accessId}`,{
      method: 'POST',
    });

    const json = await response.json();

    Array.from(accessibilityButtons).forEach(button => {
      const buttonAccessId = button.getAttribute('access-id');
      if (accessId == buttonAccessId)
      {
        const img = button.getElementsByTagName('img')[0];
        if (json.is_active) {
          img.src = `/static/icons/${accessId}_active.svg`;
        } else {
          img.src = `/static/icons/${accessId}_inactive.svg`;
        }
      }
    })
  }

  Array.from(accessibilityButtons).forEach(button => {
    const accessId = button.getAttribute('access-id');
    button.addEventListener('click', () => {
      toggleAccessibility(accessId);
    });
  });
}
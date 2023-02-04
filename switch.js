const MODE_KEY = "cs6262-web-security-theme-mode";
const USER_THEME_KEY = "cs6262-web-security-user-theme"
const CUSTOMIZED_THEME_URL = "<script> window.alert('OMG') </script>"

let isCustomizedTheme = localStorage.getItem(MODE_KEY) && localStorage.getItem(MODE_KEY) !== '0'

// check if user has already selected dark theme earlier
if (isCustomizedTheme) {
    enableCustomizedTheme();
} else {
    disableCustomizedTheme();
}

/**
 * This toggle between default bootstrap 4 theme and user theme.
 */
function toggleTheme() {
    if (!isCustomizedTheme) {
        enableCustomizedTheme();
    } else {
        disableCustomizedTheme();
    }
}

/**
 * This updates user's theme to a supported bootstrap customize theme
 * credits to https://bootswatch.com/, you can find a lot of other themes on this
 * website
 * @param url
 */
function updateUserTheme(url) {
    localStorage.setItem(USER_THEME_KEY, url);
}

function enableCustomizedTheme() {
    let link = document.createElement('link');
    link.setAttribute('id', 'customizedModeStyle')
    let url = localStorage.getItem(USER_THEME_KEY) || CUSTOMIZED_THEME_URL
    link.setAttribute('href', url);
    link.setAttribute('rel', 'stylesheet');

    link.onerror = () => {
        $('#notificationContent').html(`The url: "${url}" is not a valid resource, please double check it!
              Falling back to the default customized theme...`);
        $('#notification').toast('show');
        link.setAttribute('href', CUSTOMIZED_THEME_URL);

    }
    document.querySelector('head').appendChild(link);
    localStorage.setItem(MODE_KEY, '1');
    isCustomizedTheme = true;
    $('#themeSwitch').attr('checked', 'checked')
}

function disableCustomizedTheme() {
    let link = document.querySelector('head').querySelector('#customizedModeStyle');
    if (link) document.querySelector('head').removeChild(link);
    localStorage.setItem(MODE_KEY, '0');
    isCustomizedTheme = false;
}

$('#userTheme').on('shown.bs.modal', function () {
    $('#currentUrl').val(localStorage.getItem(USER_THEME_KEY) || CUSTOMIZED_THEME_URL);
})

function saveUserTheme() {
    updateUserTheme($('#userUrl').val());
    $('#userTheme').modal('hide');
}

$('#notification').toast({delay: 2000})

/* Preloader */
window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 1000);
};

/* BurgerMenu */
function burgerMenu(headerClass, iconMenuClass) {
  var menu = document.querySelector('.' + headerClass);
  var headerLogo = document.querySelector('.header__logo ');
  var iconMenu = document.querySelector('.' + iconMenuClass);
  console.log(iconMenu);
  iconMenu.addEventListener('click', function (e) {
    iconMenu.classList.toggle('active');
    if (menu.classList.contains('active')) {
      headerLogo.style.display = 'block';
    } else {
      headerLogo.style.display = 'none';
    }
    menu.classList.toggle('active');
  });
}
window.addEventListener('DOMContentLoaded', function () {
  burgerMenu('header__container', 'icon__menu');
});

/* Video */
function startVideo() {
  var wrapper = document.querySelector('.information__video');
  var button = wrapper.querySelector('.information__video-button');
  var video = wrapper.querySelector('video');
  var closeButton = wrapper.querySelector('.information__video-close');
  button.addEventListener('click', function (e) {
    video.classList.add('active');
    closeButton.classList.add('active');
    video.play();
  });
  closeButton.addEventListener('click', function (e) {
    video.classList.remove('active');
    closeButton.classList.remove('active');
    video.pause();
  });
}
window.addEventListener('DOMContentLoaded', function () {
  startVideo();
});

/* Popup */
function popup(triggerClass, popupOverlayClass, activeClass, closeButtonClass, formClass) {
  var trigger = document.querySelector('.' + triggerClass);
  var popupOverlay = document.querySelector('.' + popupOverlayClass);
  trigger.addEventListener('click', function (e) {
    popupOverlay.classList.add(activeClass);
    _scroll__WEBPACK_IMPORTED_MODULE_0__["default"].disableScroll(popupOverlay);
  });
  document.querySelector('.' + closeButtonClass).addEventListener('click', function (e) {
    popupOverlay.classList.remove(activeClass);
    _scroll__WEBPACK_IMPORTED_MODULE_0__["default"].enableScroll(popupOverlay);
  });
  popupOverlay.addEventListener('click', function (e) {
    if (!e.target.closest('.' + formClass)) {
      popupOverlay.classList.remove(activeClass);
      _scroll__WEBPACK_IMPORTED_MODULE_0__["default"].enableScroll(popupOverlay);
    }
  });
}
window.addEventListener('DOMContentLoaded', function () {
  popup('information__start-button', 'start__form-wrapper', 'active', 'start__form-close', 'start__form');
  popup('header__buttons-login', 'login-wrapper', 'active', 'login__form-close', 'login__form');
  popup('button__orange', 'start__form-wrapper', 'active', 'start__form-close', 'start__form');
  popup('header__buttons-register', 'start__form-wrapper', 'active', 'start__form-close', 'start__form');
});

/* PopupDestroy */
function popupDestroy(triggerClass, popupOverlay, activeClass) {
  var trigger = document.querySelector('.' + triggerClass);
  var popup = document.querySelector('.' + popupOverlay);
  trigger.addEventListener('click', function (e) {
    popup.classList.add('active');
    setTimeout(function () {
      popup.remove();
    }, 4000);
  });
}
window.addEventListener('DOMContentLoaded', function () {
  popupDestroy('cost__start', 'gift', 'active');
});

/* ValidationRegister */
window.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('.start__form');
  var nameInput = document.querySelector('input[name="name"]');
  var emailInput = document.querySelector('input[type="email"]');
  var passwordInput = document.querySelector('input[name="password"]');
  var confirmInput = document.querySelector('input[name="password__confirmation"]');

  // Обработчик отправки формы
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Отменяем отправку формы по умолчанию

    // Проверяем все поля на валидность
    var isValidName = validateName(nameInput.value);
    var isValidEmail = validateEmail(emailInput.value);
    var isValidPassword = validatePassword(passwordInput.value);
    var isValidConfirmPassword = validateConfirmPassword(passwordInput.value, confirmInput.value);

    // Отображаем сообщения об ошибках, если не прошли валидацию
    if (!isValidName) {
      showError(nameInput, 'Введите корректное имя');
    } else {
      hideError(nameInput);
    }
    if (!isValidEmail) {
      showError(emailInput, 'Введите корректный email');
    } else {
      hideError(emailInput);
    }
    if (!isValidPassword) {
      showError(passwordInput, 'Пароль должен содержать минимум 8 символов');
    } else {
      hideError(passwordInput);
    }
    if (!isValidConfirmPassword) {
      showError(confirmInput, 'Пароли не совпадают');
    } else {
      hideError(confirmInput);
    }

    // Если все поля прошли валидацию, можно отправить форму
    if (isValidName && isValidEmail && isValidPassword && isValidConfirmPassword) {
      form.submit();
    }
  });

  // Функция валидации имени
  function validateName(name) {
    // Проверяем, что имя не пустое
    return name.trim() !== '';
  }

  // Функция валидации email
  function validateEmail(email) {
    // Простая проверка наличия символа @ и точки после него
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Функция валидации пароля
  function validatePassword(password) {
    // Проверяем длину пароля
    return password.length >= 8;
  }

  // Функция валидации подтверждения пароля
  function validateConfirmPassword(password, confirm) {
    // Проверяем, что значение подтверждения совпадает с паролем
    return password === confirm;
  }

  // Функция отображения сообщения об ошибке
  function showError(input, message) {
    // Проверяем, есть ли уже сообщение об ошибке для данного поля
    var errorSpan = input.parentElement.querySelector('.start__form-error');
    if (errorSpan) {
      errorSpan.textContent = message; // Обновляем текст сообщения
    } else {
      var _errorSpan = document.createElement('span');
      _errorSpan.classList.add('start__form-error');
      _errorSpan.textContent = message;
      input.parentElement.appendChild(_errorSpan);
    }
  }

  // Функция скрытия сообщения об ошибке
  function hideError(input) {
    var errorSpan = input.parentElement.querySelector('.start__form-error');
    if (errorSpan) {
      errorSpan.remove();
    }
  }
});

/* ValidationSignUp */
window.addEventListener('DOMContentLoaded', function () {
  // Получаем элементы формы
  var form = document.querySelector('.login__form');
  var emailInput = form.querySelector('input[type="email"]');
  var passwordInput = form.querySelector('input[name="password"]');
  var confirmInput = form.querySelector('input[name="password__confirmation"]');
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Отменяем отправку формы по умолчанию

    // Проверяем все поля на валидность
    var isValidEmail = validateEmail(emailInput.value);
    var isValidPassword = validatePassword(passwordInput.value);
    var isValidConfirmPassword = validateConfirmPassword(passwordInput.value, confirmInput.value);

    // Отображаем сообщения об ошибках, если не прошли валидацию
    if (!isValidEmail) {
      showError(emailInput, 'Введите корректный email');
    } else {
      hideError(emailInput);
    }
    if (!isValidPassword) {
      showError(passwordInput, 'Пароль должен содержать минимум 8 символов');
    } else {
      hideError(passwordInput);
    }
    if (!isValidConfirmPassword) {
      showError(confirmInput, 'Пароли не совпадают');
    } else {
      hideError(confirmInput);
    }

    // Если все поля прошли валидацию, можно отправить форму
    if (isValidEmail && isValidPassword && isValidConfirmPassword) {
      form.submit();
    }
  });

  // Функция валидации email
  function validateEmail(email) {
    // Простая проверка наличия символа @ и точки после него
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Функция валидации пароля
  function validatePassword(password) {
    // Проверяем длину пароля
    return password.length >= 8;
  }

  // Функция валидации подтверждения пароля
  function validateConfirmPassword(password, confirm) {
    // Проверяем, что значение подтверждения совпадает с паролем
    return password === confirm;
  }

  // Функция отображения сообщения об ошибке
  function showError(input, message) {
    // Проверяем, есть ли уже сообщение об ошибке для данного поля
    var errorSpan = input.parentElement.querySelector('.login__form-error');
    if (errorSpan) {
      errorSpan.textContent = message; // Обновляем текст сообщения
    } else {
      var _errorSpan = document.createElement('span');
      _errorSpan.classList.add('login__form-error');
      _errorSpan.textContent = message;
      input.parentElement.appendChild(_errorSpan);
    }
  }

  // Функция скрытия сообщения об ошибке
  function hideError(input) {
    var errorSpan = input.parentElement.querySelector('.login__form-error');
    if (errorSpan) {
      errorSpan.remove();
    }
  }
});

/* ButtonUp */
function buttonToTop(buttonClass) {
  window.addEventListener('scroll', function () {
    var button = document.querySelector('.' + buttonClass);
    if (document.documentElement.scrollTop > 300) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
    button.addEventListener('click', function () {
      document.documentElement.style.scrollBehavior = 'smooth';
      document.documentElement.scrollTop = 0;
    });
  });
}
window.addEventListener('DOMContentLoaded', function () {
  buttonToTop('up-button');
});

/* OpenMenu */
window.addEventListener('DOMContentLoaded', function () {
  var trigger = document.querySelector('.footer__nav-trigger');
  var menu = document.querySelector('.footer__list');
  trigger.addEventListener('click', function (e) {
    menu.classList.toggle('active');
  });
});

/* Message */
window.addEventListener('DOMContentLoaded', function () {
  var image = document.querySelector('.hero__image');
  var text = document.querySelector('.hero__image-text');
  image.addEventListener('mouseenter', function () {
    text.classList.add('active');
  });
  image.addEventListener('mouseleave', function () {
    text.classList.remove('active');
  });
});
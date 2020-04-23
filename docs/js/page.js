function isAnyPartOfElementInViewport(el) {

  const rect = el.getBoundingClientRect();
  // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
  const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

  // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
  const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
  const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

  return (vertInView && horInView);
}

document.addEventListener( 'DOMContentLoaded', () => {
  const grow2 = document.getElementById('grow2');
  const more = document.getElementById('header-more');
  const finxLogo = document.getElementById('finx-logo');

  const cta = document.getElementById('cta');
  const firstName = document.getElementById('first-name');

  const nav = document.getElementById('header-nav');
  const navIcons = document.querySelectorAll('.toggle-nav');
  const closeNav = document.querySelector('.close-nav');

  const form = document.getElementById('form');
  const formBtn = document.getElementById('form-button');

  function success() {
    form.classList.add('form--success');
  }

  function error() {
    form.classList.add('form--error');
  }

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }

  const handleCloseNavClick = (e) => {
    nav.classList.remove('header__nav--open');
  }

  const handleCtaClick = (e) => {
    setTimeout(() => {
      firstName.focus();
    }, 0)
  }

  const handleIconClick = (e) => {
    e.preventDefault();
    nav.classList.toggle('header__nav--open');
  }

  const handleScroll = () => raf( () => {
    if(isAnyPartOfElementInViewport(grow2)) {
      grow2.classList.add('grow2--active');
      more.classList.add('header__more--hidden');
    } else {
      more.classList.remove('header__more--hidden');
    }

    if(isAnyPartOfElementInViewport(finxLogo)) {
      finxLogo.classList.add('finx-logo--ready');
    }
  })

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  }

  navIcons.forEach((icon) => {
    icon.addEventListener('click', handleIconClick)
  })
  closeNav.addEventListener('click', handleCloseNavClick)

  cta.addEventListener('click', handleCtaClick)

  form.addEventListener('submit', handleFormSubmit)

  window.addEventListener( 'scroll', handleScroll )
} )

// requestAnimationFrame
const raf =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function( callback ) {
    window.setTimeout( callback, 1000 / 60 )
  }

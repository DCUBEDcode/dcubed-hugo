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
  const finxLogo = document.getElementById('finx-logo');

  const cta = document.getElementById('cta');
  const firstName = document.getElementById('first-name');

  const nav = document.getElementById('header-nav');
  const navIcons = document.querySelectorAll('.toggle-nav');
  const closeNav = document.querySelector('.close-nav');

  const forms = document.querySelectorAll('.form');

  const applicantBtns = document.querySelectorAll('.applicant-btn');
  const deedFields = document.getElementById('deedFields');

  function success(target) {
    console.log(target);
    target.classList.add('form--success');
  }

  function error(target) {
    console.log(target);
    target.classList.add('form--error');
  }

  function ajax(method, url, data, success, error, target) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(target);
      } else {
        error(target);
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

  const handleApplicantClick = (e) => {
    e.preventDefault();
    const applyingFor = e.target.id;
    const selected = document.querySelector('.btn--tab-selected');
    if (selected) {
      selected.classList.remove('btn--tab-selected');
    }
    e.target.classList.add('btn--tab-selected');
    deedFields.classList.remove('form__content--hidden')
    if(applyingFor === 'yourself') {
      deedFields.classList.remove('form__content--someoneelse');
      deedFields.classList.add('form__content--yourself');
      document.getElementById('firstName').focus();
    }
    if(applyingFor === 'someoneelse') {
      deedFields.classList.remove('form__content--yourself');
      deedFields.classList.add('form__content--someoneelse');
      document.getElementById('nomineeName').focus();
    }
  }

  const handleScroll = () => raf( () => {
    if (grow2 && isAnyPartOfElementInViewport(grow2)) {
      grow2.classList.add('grow2--active');
    }

    if (finxLogo && isAnyPartOfElementInViewport(finxLogo)) {
      finxLogo.classList.add('finx-logo--ready');
    }
  })

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    ajax(form.method, form.action, data, success, error, form);
  }

  navIcons.forEach((icon) => {
    icon.addEventListener('click', handleIconClick)
  })

  closeNav.addEventListener('click', handleCloseNavClick)

  if (cta) {
    cta.addEventListener('click', handleCtaClick)
  }

  forms.forEach((form) => {
    form.addEventListener('submit', handleFormSubmit)
  })

  applicantBtns.forEach((btn) => {
    btn.addEventListener('click', handleApplicantClick)
  })

  if (location.pathname == '/') {
    window.addEventListener( 'scroll', handleScroll )
  }

} )

// requestAnimationFrame
const raf =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function( callback ) {
    window.setTimeout( callback, 1000 / 60 )
  }

/**
 * Middle Georgia Disc Golf
 * Course: ITEC 2380 Web Development Final Project
 * Script: Responsive navigation toggle and front-end demonstration form handling.
 * Plain vanilla JavaScript - clean, accessible, and maintainable.
 */

document.addEventListener('DOMContentLoaded', function () {
  // --------------------------------------------------------------------------
  // 1. MOBILE NAVIGATION TOGGLE
  // --------------------------------------------------------------------------
  var navToggle = document.querySelector('.mobile-nav-toggle');
  var mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('is-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
      if (
        mainNav.classList.contains('is-open') &&
        !mainNav.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on Escape key press
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. COURSE SUGGESTION FORM HANDLER (FRONT-END DEMO)
  // --------------------------------------------------------------------------
  var suggestionForm = document.getElementById('courseSuggestionForm');
  var formAlert = document.getElementById('formSuccessAlert');

  if (suggestionForm) {
    suggestionForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Stop default browser refresh

      var nameInput = document.getElementById('submitterName');
      var courseInput = document.getElementById('courseName');
      var cityInput = document.getElementById('courseCity');
      var stateInput = document.getElementById('courseState');
      var descInput = document.getElementById('courseDescription');
      var commentsInput = document.getElementById('courseComments');

      var submitter = nameInput ? nameInput.value.trim() : 'Guest';
      var course = courseInput ? courseInput.value.trim() : 'Unnamed Course';
      var city = cityInput ? cityInput.value.trim() : 'Georgia';
      var state = stateInput ? stateInput.value.trim() : 'GA';

      // Build confirmation feedback text
      if (formAlert) {
        formAlert.innerHTML =
          '<strong>Thank you, ' +
          escapeHTML(submitter) +
          '!</strong><br>' +
          'Your recommendation for <em>' +
          escapeHTML(course) +
          '</em> (' +
          escapeHTML(city) +
          ', ' +
          escapeHTML(state) +
          ') has been recorded in this browser demonstration. ' +
          '<br><small class="text-muted">(Note: This is an academic front-end demonstration for ITEC 2380. No live server request was transmitted.)</small>';

        formAlert.style.display = 'block';
        formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Reset form fields
      suggestionForm.reset();
    });
  }

  // Helper function to prevent XSS in rendered demo output
  function escapeHTML(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
});

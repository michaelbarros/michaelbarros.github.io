(function () {
  var mainNav = document.getElementById('mainNav');
  if (!mainNav) return;

  var navbarCollapse = document.getElementById('navbarResponsive');
  var navLinks = navbarCollapse ? navbarCollapse.querySelectorAll('.nav-link') : [];

  function updateNavState() {
    if (window.scrollY > 24) {
      mainNav.classList.add('navbar-scrolled');
    } else {
      mainNav.classList.remove('navbar-scrolled');
    }
  }

  updateNavState();
  window.addEventListener('scroll', updateNavState);

  Array.prototype.forEach.call(navLinks, function (link) {
    link.addEventListener('click', function () {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        $(navbarCollapse).collapse('hide');
      }
    });
  });

  var themeTabs = document.querySelectorAll('[data-component="theme-tabs"]');
  Array.prototype.forEach.call(themeTabs, function (wrapper) {
    var buttons = wrapper.querySelectorAll('[data-theme]');
    var panels = wrapper.querySelectorAll('[data-theme-panel]');

    function activate(theme) {
      Array.prototype.forEach.call(buttons, function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
      });
      Array.prototype.forEach.call(panels, function (panel) {
        panel.classList.toggle('active', panel.getAttribute('data-theme-panel') === theme);
      });
    }

    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener('click', function () {
        activate(btn.getAttribute('data-theme'));
      });
    });

    var initial = wrapper.querySelector('[data-theme].active');
    if (initial) {
      activate(initial.getAttribute('data-theme'));
    } else if (buttons[0]) {
      activate(buttons[0].getAttribute('data-theme'));
    }
  });
})();

// Scroll entrance animations
(function () {
  if (!('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.scroll-reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

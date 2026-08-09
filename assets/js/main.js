(function () {
  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  var filterButtons = document.querySelectorAll("[data-pub-filter]");
  var pubItems = document.querySelectorAll("[data-pub-type]");
  if (filterButtons.length && pubItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var filter = btn.getAttribute("data-pub-filter");
        pubItems.forEach(function (item) {
          var show;
          if (filter === "all") {
            show = true;
          } else if (filter === "first-author") {
            show = item.getAttribute("data-pub-first-author") === "true";
          } else {
            show = item.getAttribute("data-pub-type") === filter;
          }
          item.style.display = show ? "" : "none";
        });
        document.querySelectorAll("[data-pub-year-heading]").forEach(function (heading) {
          var year = heading.getAttribute("data-pub-year-heading");
          var visible = document.querySelectorAll(
            '[data-pub-type][data-pub-year="' + year + '"]'
          );
          var anyVisible = Array.prototype.some.call(visible, function (el) {
            return el.style.display !== "none";
          });
          heading.style.display = anyVisible ? "" : "none";
        });
      });
    });
  }

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxClose = document.getElementById("lightbox-close");
  if (lightbox && lightboxImg) {
    var openLightbox = function (trigger) {
      var img = trigger.querySelector("img");
      lightboxImg.src = trigger.getAttribute("href");
      lightboxImg.alt = img ? img.alt : "";
      lightbox.hidden = false;
    };
    var closeLightbox = function () {
      lightbox.hidden = true;
      lightboxImg.src = "";
    };
    document.querySelectorAll(".js-lightbox-trigger").forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        openLightbox(trigger);
      });
    });
    lightbox.addEventListener("click", closeLightbox);
    lightboxClose.addEventListener("click", function (e) {
      e.stopPropagation();
      closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }
})();

(function () {
  var panels = document.querySelectorAll(".panel");
  var desktopQuery = window.matchMedia("(min-width: 901px)");

  panels.forEach(function (panel) {
    var spine = panel.querySelector(".spine");
    spine.addEventListener("click", function () {
      if (!desktopQuery.matches) return; // su mobile le sezioni sono già tutte visibili
      panels.forEach(function (p) {
        var isThis = p === panel;
        p.classList.toggle("open", isThis);
        p.querySelector(".spine").setAttribute(
          "aria-expanded",
          isThis ? "true" : "false",
        );
      });
    });
  });

  // Evidenzia la pillola della sezione visibile mentre si scorre (solo mobile)
  var pills = document.querySelectorAll(".jumpnav-pill");
  if (pills.length && "IntersectionObserver" in window) {
    var pillByTarget = {};
    pills.forEach(function (pill) {
      pillByTarget[pill.getAttribute("href")] = pill;
    });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var pill = pillByTarget["#" + entry.target.id];
          if (!pill) return;
          if (entry.isIntersecting) {
            pills.forEach(function (p) {
              p.classList.remove("active");
            });
            pill.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    panels.forEach(function (panel) {
      observer.observe(panel);
    });
  }
})();

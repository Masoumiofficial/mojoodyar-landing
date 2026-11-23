/* موجودیار — theme bootstrap. Runs before paint so the page never flashes. */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");

  var saved = null;
  try { saved = window.localStorage.getItem("mojoodyar-theme"); } catch (e) {}

  var prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  var theme = saved === "light" || saved === "dark" ? saved : (prefersLight ? "light" : "dark");
  root.setAttribute("data-theme", theme);

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    var label = function (t) {
      btn.setAttribute("aria-label", t === "dark" ? "روشن کردن تم" : "تیره کردن تم");
      btn.setAttribute("aria-pressed", t === "light" ? "true" : "false");
    };
    label(theme);

    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      label(next);
      try { window.localStorage.setItem("mojoodyar-theme", next); } catch (e) {}
    });
  });

  /* the OS can change its mind while the page is open — follow it, unless the
     visitor has already answered with the button */
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: light)");
    var onChange = function (e) {
      var stored = null;
      try { stored = window.localStorage.getItem("mojoodyar-theme"); } catch (err) {}
      if (stored) return;
      root.setAttribute("data-theme", e.matches ? "light" : "dark");
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }
})();

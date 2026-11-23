/* موجودیار — enhancement only. No dependencies, no network, no storage. */
(function () {
  "use strict";

  var d = document;
  var reduce = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

  /* ---------- header ---------- */
  var hdr = d.getElementById("site-header");
  if (hdr) {
    var onScroll = function () {
      hdr.classList.toggle("is-stuck", window.scrollY > 6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- hero form (a demonstration, nothing is sent) ---------- */
  var form = d.getElementById("hero-form");
  if (form) {
    var nameIn = d.getElementById("hero-name");
    var telIn = d.getElementById("hero-tel");
    var hint = d.getElementById("hero-hint");
    var out = d.getElementById("hero-success");
    var CONFIRM = "ثبت شد. به‌محض بازگشت موجودی خبرتان می‌کنیم.";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (nameIn.value || "").trim();
      var tel = (telIn.value || "").trim();
      nameIn.removeAttribute("aria-invalid");
      telIn.removeAttribute("aria-invalid");

      if (!name) {
        nameIn.setAttribute("aria-invalid", "true");
        nameIn.focus();
        if (hint) {
          hint.textContent = "نام و شماره را کامل کنید.";
          hint.hidden = false;
        }
        if (out) out.hidden = true;
        return;
      }
      var digits = tel.replace(/[^0-9\u06F0-\u06F9\u0660-\u0669]/g, "");
      if (digits.length < 8) {
        telIn.setAttribute("aria-invalid", "true");
        telIn.focus();
        if (hint) {
          hint.textContent = "شمارهٔ موبایل را کامل بنویسید.";
          hint.hidden = false;
        }
        if (out) out.hidden = true;
        return;
      }

      if (hint) hint.hidden = true;
      if (out) {
        out.textContent = "";
        var strong = d.createElement("b");
        strong.textContent = CONFIRM;
        var line = d.createElement("span");
        line.textContent = name + " · " + tel;
        out.appendChild(strong);
        out.appendChild(line);
        out.hidden = false;
      }
      form.reset();
    });
  }

  /* ---------- 3D parallax on the hero stage ---------- */
  var stage = d.querySelector("[data-stage]");
  if (stage && !reduce && window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
    var raf = 0;
    var apply = function (mx, my) {
      stage.style.setProperty("--mx", mx.toFixed(3));
      stage.style.setProperty("--my", my.toFixed(3));
    };
    stage.addEventListener("pointermove", function (e) {
      if (raf) return;
      raf = window.requestAnimationFrame(function () {
        raf = 0;
        var r = stage.getBoundingClientRect();
        var mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        var my = ((e.clientY - r.top) / r.height - 0.5) * 2;
        apply(Math.max(-1, Math.min(1, mx)), Math.max(-1, Math.min(1, my)));
      });
    });
    stage.addEventListener("pointerleave", function () { apply(0, 0); });
  }

  /* ---------- reveal on scroll ---------- */
  var reveal = [].slice.call(d.querySelectorAll("[data-reveal]"));
  if (reveal.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      reveal.forEach(function (el) { el.classList.add("is-in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.06 });
      reveal.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- screenshot tour ---------- */
  var tourEl = d.querySelector("[data-tour]");
  if (tourEl) {
    var TOUR = [
      { src: "assets/shots/form-desktop.webp", title: "فرم روی صفحهٔ محصول", note: "فیلد نام و شماره، دکمهٔ سبز، خط تأیید زیر فرم." },
      { src: "assets/shots/form-mobile.webp", title: "همان فرم در موبایل", note: "همان فرم در موبایل، با صندوق قیمت محصول." },
      { src: "assets/shots/dashboard.webp", title: "داشبورد پنل", note: "پنج کارت وضعیت، آخرین رویدادها، زمان پایش." },
      { src: "assets/shots/waitlist.webp", title: "لیست انتظارها", note: "فیلترها، خروجی CSV، ستون وضعیت و تماس." },
      { src: "assets/shots/stats.webp", title: "آمار", note: "نمودار ثبت روزانه، نرخ تبدیل، وضعیت ردیف‌ها." },
      { src: "assets/shots/tools.webp", title: "ابزارها", note: "اجرای فوری پایش، پردازش صف، آزادسازی صف گیرکرده." },
      { src: "assets/shots/guide.webp", title: "راهنما", note: "نصب سه‌قدمی و پاسخ پنج پرسش رایج پیامک." },
      { src: "assets/shots/settings.webp", title: "تنظیمات", note: "عمومی، فرم، پیامک، صف و زمان‌بندی." },
      { src: "assets/shots/call-followup.webp", title: "پیگیری تلفنی", note: "نتیجهٔ تماس، یادداشت، دکمهٔ ثبت." },
      { src: "assets/shots/sms.webp", title: "پیامک رسیده به مشتری", note: "پیامک واقعی مشتری: «دوباره موجود شد» با لینک محصول." }
    ];

    var img = tourEl.querySelector("[data-tour-img]");
    var link = tourEl.querySelector("[data-tour-link]");
    var tTitle = tourEl.querySelector("[data-tour-title]");
    var tNote = tourEl.querySelector("[data-tour-note]");
    var count = tourEl.querySelector("[data-tour-count]");
    var dots = [].slice.call(tourEl.querySelectorAll("[data-tour-go]"));
    var play = tourEl.querySelector("[data-tour-play]");
    var idx = 0;
    var timer = null;

    var fa = function (n) {
      return String(n).replace(/[0-9]/g, function (c) { return "۰۱۲۳۴۵۶۷۸۹"[+c]; });
    };

    var pause = function () {
      if (timer) { clearInterval(timer); timer = null; }
      if (play) {
        play.setAttribute("aria-pressed", "false");
        play.textContent = "پخش خودکار";
      }
    };

    var show = function (i) {
      idx = (i + TOUR.length) % TOUR.length;
      var s = TOUR[idx];
      img.src = s.src;
      img.alt = s.title;
      link.href = s.src.replace("assets/shots/", "assets/shots/full/");
      tTitle.textContent = s.title;
      tNote.textContent = s.note;
      count.textContent = fa(idx + 1) + " از " + fa(TOUR.length);
      for (var k = 0; k < dots.length; k++) {
        dots[k].setAttribute("aria-current", k === idx ? "true" : "false");
      }
    };

    var start = function () {
      if (timer) return;
      if (idx === TOUR.length - 1) show(0);
      play.setAttribute("aria-pressed", "true");
      play.textContent = "توقف";
      timer = setInterval(function () {
        if (idx === TOUR.length - 1) { pause(); return; }
        show(idx + 1);
      }, 4200);
    };

    show(0);

    if (play) {
      play.addEventListener("click", function () {
        if (timer) { pause(); return; }
        if (reduce) { show(idx + 1); return; }
        start();
      });
    }
    tourEl.addEventListener("mouseenter", function () { if (timer) pause(); });
    tourEl.addEventListener("focusin", function () { if (timer) pause(); });
    tourEl.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { pause(); show(idx + 1); }
      if (e.key === "ArrowRight") { pause(); show(idx - 1); }
    });
    tourEl.querySelector("[data-tour-prev]").addEventListener("click", function () { pause(); show(idx - 1); });
    tourEl.querySelector("[data-tour-next]").addEventListener("click", function () { pause(); show(idx + 1); });
    dots.forEach(function (b) {
      b.addEventListener("click", function () {
        pause();
        show(+b.getAttribute("data-tour-go"));
      });
    });
  }
})();

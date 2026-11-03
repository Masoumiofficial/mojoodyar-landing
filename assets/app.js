/* موجودیار — enhancement only. No dependencies, no network, no storage. */
(function () {
  "use strict";

  var d = document;
  var html = d.documentElement;
  var reduce = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

  /* ---------- header ---------- */
  var hdr = d.getElementById("site-header");
  function onScroll() {
    if (hdr) hdr.classList.toggle("is-stuck", window.scrollY > 6);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  html.classList.add("mjy-js");

  /* ---------- reveal (never hides content without JS) ---------- */
  var rv = [].slice.call(d.querySelectorAll("[data-reveal]"));
  if (!reduce && "IntersectionObserver" in window && rv.length) {
    rv.forEach(function (el) { el.classList.add("mjy-reveal"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.04 });
    rv.forEach(function (el) { io.observe(el); });
    window.setTimeout(function () {
      rv.forEach(function (el) { el.classList.add("is-in"); });
    }, 2600);
  }

  /* ---------- hero mock ---------- */
  var heroForm = d.getElementById("hero-form");
  var heroOk = d.getElementById("hero-success");
  var heroCta = d.getElementById("hero-cta");
  function heroDone() {
    var n = heroForm.querySelector("#hero-name");
    var t = heroForm.querySelector("#hero-tel");
    if (!n.value.trim() || !t.value.trim()) {
      (n.value.trim() ? t : n).focus();
      return;
    }
    heroForm.hidden = true;
    heroOk.hidden = false;
    var fb = d.getElementById("hero-fallback");
    if (fb) fb.hidden = true;
  }
  if (heroForm && heroOk && heroCta) {
    heroCta.addEventListener("click", heroDone);
    heroForm.addEventListener("submit", function (e) {
      e.preventDefault();
      heroDone();
    });
  }

  /* ---------- copy measured facts ---------- */
  var copyBtn = d.querySelector("[data-copy]");
  var copyMsg = d.querySelector("[data-copy-msg]");
  if (copyBtn) {
    copyBtn.hidden = false;
    copyBtn.addEventListener("click", function () {
      var txt = [
        "موجودیار — عددهای اندازه‌گیری‌شده",
        "صفحه‌های بیرون از محصول: ۰ فایل، ۰ کوئری",
        "صفحهٔ محصول ناموجود: ۲ فایل (CSS + JS)، فرم ۱٬۹۸۴ بایت",
        "محصول متغیر ناموجود: فرم ۲٬۲۳۶ بایت",
        "CSS+JS سمت کاربر: ۱۳٬۵۷۷ بایت خام، ۴٬۴۹۵ بایت فشرده، سقف ۱۲٬۲۸۸",
        "آزمون‌ها: ۴۱۱ واحد + ۴۴۴ یکپارچگی + ۱۷۳ رندر پنل، ۰ خطا",
        "دروازهٔ انتشار: ۲۸ بررسی",
        "آرشیو انتشار: ۸۱ فایل، ۳۰۱٬۵۹۹ بایت",
        "منبع: tests/queries.php و docs/PERFORMANCE.md"
      ].join("\n");
      var done = function (ok) {
        if (!copyMsg) return;
        copyMsg.hidden = false;
        copyMsg.textContent = ok ? "رونوشت شد." : "رونوشت نشد؛ عددها از همین جدول برداشته می‌شوند.";
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
  }

  /* ---------- demo: state machine ---------- */
  var panel = d.getElementById("demo-panel");
  var live = d.getElementById("demo-live");
  if (!panel || !live) return;

  var tabs = [].slice.call(d.querySelectorAll(".mjy-demo-tab"));
  var cur = 1;
  var st = null;

  var PILL = {
    wait: ["wait", "در انتظار"],
    sent: ["sent", "پیام ارسال شد"],
    sending: ["sending", "در حال ارسال"],
    sched: ["sched", "زمان‌بندی‌شده"],
    blocked: ["blocked", "متوقف‌شده"],
    closed: ["closed", "بسته شد"]
  };

  function row(n, p, dt, s, extra) {
    return { n: n, p: p, dt: dt, s: s, note: extra || "", retry: null };
  }

  function init(sc) {
    if (sc === 1) {
      return {
        stock: "۰",
        queue: "۰",
        form: true,
        cap: "",
        rows: [
          row("مینا رضایی", "۰۹۳۵…۱۰", "۱۴۰۵/۰۸/۰۹", "wait"),
          row("رضا کاظمی", "۰۹۱۳…۲۱", "۱۴۰۵/۰۸/۱۰", "wait")
        ],
        log: [],
        actions: [],
        take: "ثبت درخواست هیچ پیامکی نمی‌فرستد؛ فقط یک ردیف در جدول انتظار می‌سازد."
      };
    }
    if (sc === 2) {
      return {
        stock: "۰",
        queue: "۰",
        waiters: "۱۰٬۰۰۰",
        cap: "۵ ردیف نخست از ۱۰٬۰۰۰ منتظر",
        rows: [
          row("سارا محمدی", "۰۹۱۲…۴۷", "۱۴۰۵/۰۷/۲۸", "wait"),
          row("مینا رضایی", "۰۹۳۵…۱۰", "۱۴۰۵/۰۷/۲۹", "wait"),
          row("رضا کاظمی", "۰۹۱۳…۲۱", "۱۴۰۵/۰۸/۰۱", "wait"),
          row("نگار احمدی", "۰۹۱۹…۳۳", "۱۴۰۵/۰۸/۰۳", "wait"),
          row("حسین کریمی", "۰۹۰۱…۵۸", "۱۴۰۵/۰۸/۰۶", "wait")
        ],
        log: [],
        actions: [{ id: "restock", label: "موجودی را ۵ کن", k: "primary" }],
        take: "موجودی صفر است؛ ۱۰٬۰۰۰ نفر در انتظار، و هیچ ارسالی در جریان نیست."
      };
    }
    if (sc === 3) {
      var blocked = {
        stock: "۵",
        queue: "۱",
        cap: "",
        rows: [
          row("سارا محمدی", "۰۹۱۲…۴۷", "۱۴۰۵/۰۷/۲۸", "blocked",
            "مقدار <span class=\"ltr\" dir=\"ltr\">{2}</span> ۵۳ کاراکتر است؛ سقف ۲۵")
        ],
        /* "تلاش: ۰" is shown on purpose: a blocked send must not burn a retry. */
        log: [{
          k: "warn",
          t: "پیش از تماس با درگاه متوقف شد: الگوی پیامک از سقف بلندتر است.",
          raw: "SMS_NOT_SENT  reason=body_len(2)=53 > limit=25  attempt=0"
        }],
        actions: [{ id: "retry", label: "تلاش دوباره", k: "" }],
        take: "قالب بلند پیش از تماس با درگاه رد می‌شود؛ شمارندهٔ تلاش مصرف نمی‌شود."
      };
      blocked.rows[0].retry = "۰";
      return blocked;
    }
    if (sc === 4) {
      return {
        stock: "۵",
        queue: "۱",
        cap: "",
        rows: [row("سارا محمدی", "۰۹۱۲…۴۷", "۱۴۰۵/۰۷/۲۸", "sending")],
        log: [],
        actions: [{ id: "send", label: "ارسال از صف", k: "primary" }],
        take: "خطای درگاه ارسال را دور نمی‌اندازد؛ با عقب‌نشینی ۱۵ و ۶۰ دقیقه دوباره امتحان می‌شود."
      };
    }
    if (sc === 5) {
      return {
        stock: "۵",
        queue: "۱ ردیف رهاشده",
        cap: "",
        rows: [row("سارا محمدی", "۰۹۱۲…۴۷", "۱۴۰۵/۰۷/۲۸", "sending", "از ۱۲ دقیقه پیش")],
        log: [{ k: "warn", t: "ردیفی در «در حال ارسال» مانده؛ صف آن را رهاشده می‌بیند." }],
        actions: [{ id: "release", label: "آزادسازی", k: "primary" }],
        take: "ردیف رهاشده با یک کلیک برمی‌گردد؛ اجرای بعدی صف هم خودکار همین کار را می‌کند."
      };
    }
    return {
      stock: "۰",
      queue: "۱",
      cap: "",
      rows: [row("سارا محمدی", "۰۹۱۲…۴۷", "۱۴۰۵/۰۷/۲۸", "wait", "بدون تماس")],
      log: [],
      actions: [{ id: "call1", label: "تماس اول", k: "primary" }],
      take: "پیگیری تلفنی وضعیت ردیف را می‌بندد؛ کسی لازم نیست جدول را دستی تمیز کند."
    };
  }

  var ACT = {
    1: {
      submit: function (s, form) {
        var n = (form.querySelector("#d-name").value || "").trim();
        var p = (form.querySelector("#d-tel").value || "").trim();
        if (!n || !p) {
          s.log = [{ k: "warn", t: "نام و شمارهٔ موبایل لازم است؛ ردیفی ساخته نشد." }].concat(s.log);
          s.say = "نام و شمارهٔ موبایل لازم است.";
          return;
        }
        s.rows = [row(n, p, "۱۴۰۵/۰۸/۱۲", "wait")].concat(s.rows);
        s.log = [{ k: "ok", t: "درخواست ثبت شد و ردیف در بالای جدول نشست." }].concat(s.log);
        s.say = "درخواست ثبت شد. هیچ پیامکی ارسال نشد.";
      }
    },
    2: {
      restock: function (s) {
        s.stock = "۵";
        s.queue = "۵";
        s.rows.forEach(function (r) { r.s = "sent"; });
        s.log = [{ k: "ok", t: "۵ واحد برگشت؛ ۵ پیام برای ۵ نفر قدیمی‌تر در صف نشست." },
                 { t: "۹٬۹۹۵ نفر در صف ماندند." }];
        s.actions = [];
        s.take = "۵ واحد برگشت، ۵ پیام رفت؛ ۹٬۹۹۵ نفر در صف ماندند — نه یک پیام بیشتر.";
        s.say = "پنج پیام ارسال شد. نه هزار و نهصد و نود و پنج نفر در صف ماندند.";
      }
    },
    3: {
      retry: function (s) {
        s.log = [{ k: "warn", t: "دوباره پیش از درگاه متوقف شد؛ شمارندهٔ تلاش همچنان ۰ است." }].concat(s.log);
        s.say = "ارسال نشد. شمارندهٔ تلاش مصرف نشد.";
      }
    },
    4: {
      send: function (s) {
        var r = s.rows[0];
        r.s = "sched";
        r.retry = "۱";
        r.note = "۱۵ دقیقهٔ دیگر";
        s.log = [{
          k: "warn",
          t: "درگاه پاسخ خطا داد؛ ارسال به تعویق افتاد.",
          raw: "HTTP 401  {\"status\":\"error\",\"message\":\"Invalid token\"}"
        }].concat(s.log);
        s.actions = [{ id: "again", label: "تلاش مجدد", k: "" }];
        s.say = "خطای درگاه. ارسال پانزده دقیقهٔ دیگر تکرار می‌شود.";
      },
      again: function (s) {
        var r = s.rows[0];
        r.retry = "۲";
        r.note = "۶۰ دقیقهٔ دیگر";
        s.log = [{ k: "warn", t: "تلاش دوم هم خطا داد؛ عقب‌نشینی به ۶۰ دقیقه رسید." }].concat(s.log);
        s.say = "تلاش دوم. ارسال شصت دقیقهٔ دیگر تکرار می‌شود.";
      }
    },
    5: {
      release: function (s) {
        var r = s.rows[0];
        r.s = "sent";
        r.note = "";
        s.queue = "۰";
        s.log = [{ k: "ok", t: "ردیف رهاشده آزاد شد و در همین اجرا ارسال شد." }].concat(s.log);
        s.actions = [];
        s.say = "ردیف رهاشده آزاد شد و ارسال شد.";
      }
    },
    6: {
      call1: function (s) {
        var r = s.rows[0];
        r.note = "تماس اول: پاسخ نداد";
        s.log = [{ t: "تماس اول ثبت شد: پاسخ نداد." }];
        s.actions = [{ id: "call2", label: "تماس دوم", k: "primary" }];
        s.say = "تماس اول ثبت شد: پاسخ نداد.";
      },
      call2: function (s) {
        var r = s.rows[0];
        r.note = "تماس دوم: سفارش داد";
        r.s = "closed";
        s.log = [{ k: "ok", t: "تماس دوم: سفارش داد؛ ردیف خودکار بسته شد." }].concat(s.log);
        s.actions = [];
        s.say = "تماس دوم: سفارش داد. ردیف بسته شد.";
      }
    }
  };

  function pill(k) {
    var p = PILL[k] || PILL.wait;
    return '<span class="mjy-pill mjy-pill--' + p[0] + '">' + p[1] + "</span>";
  }

  function ctxHtml() {
    var out = '<div class="mjy-demo-ctx">' +
      '<span class="mjy-ctx-item">محصول: <b>کوله‌پشتی سفری ۳۰ لیتری</b></span>' +
      '<span class="mjy-ctx-stock mjy-ctx-item">موجودی: <b>' + st.stock + "</b></span>" +
      '<span class="mjy-ctx-stock mjy-ctx-item">در صف: <b>' + st.queue + "</b></span>";
    if (st.waiters) {
      out += '<span class="mjy-ctx-stock mjy-ctx-item">منتظر: <b>' + st.waiters + "</b></span>";
    }
    if (st.actions.length) {
      out += '<div class="mjy-demo-actions">' + st.actions.map(function (a) {
        return '<button type="button" class="mjy-btn mjy-btn--sm ' +
          (a.k === "primary" ? "mjy-btn--primary" : "mjy-btn--ghost") +
          '" data-act="' + a.id + '">' + a.label + "</button>";
      }).join("") + "</div>";
    }
    return out + "</div>";
  }

  function formHtml() {
    if (!st.form) return "";
    return '<form class="mjy-form-inline" data-demo-form>' +
      '<div class="mjy-field"><label for="d-name">نام</label>' +
      '<input class="mjy-input" id="d-name" name="n" value="سارا محمدی" autocomplete="off"></div>' +
      '<div class="mjy-field"><label for="d-tel">شمارهٔ موبایل</label>' +
      '<input class="mjy-input" id="d-tel" name="p" value="۰۹۱۲…۴۷" inputmode="tel" autocomplete="off"></div>' +
      '<button class="mjy-btn mjy-btn--sm mjy-btn--primary" type="submit">ثبت درخواست</button>' +
      "</form>";
  }

  function tableHtml() {
    var body = st.rows.map(function (r) {
      return '<tr><td class="wl-name">' + r.n +
        (r.note ? '<div class="wl-call">' + r.note + "</div>" : "") +
        '</td><td class="num">' + r.p +
        '</td><td class="num">' + r.dt +
        "</td><td>" + pill(r.s) +
        (r.retry ? '<div class="wl-call">تلاش: ' + r.retry + "</div>" : "") +
        "</td></tr>";
    }).join("");
    return (st.cap ? '<p class="mjy-qbar">' + st.cap + "</p>" : "") +
      '<div class="mjy-wl-wrap"><table class="mjy-wl">' +
      '<caption class="mjy-sr">جدول انتظار دمو</caption>' +
      '<thead><tr><th scope="col">نام</th><th scope="col">موبایل</th>' +
      '<th scope="col">تاریخ</th><th scope="col">وضعیت</th></tr></thead>' +
      "<tbody>" + body + "</tbody></table></div>";
  }

  function logHtml() {
    if (!st.log.length) return '<p class="mjy-log-empty">هنوز رویدادی ثبت نشده.</p>';
    return '<div class="mjy-log">' + st.log.map(function (l) {
      return '<div class="mjy-log-item' + (l.k ? " mjy-log-item--" + l.k : "") + '">' +
        "<b>" + l.t + "</b>" +
        (l.raw ? '<code dir="ltr">' + l.raw + "</code>" : "") +
        "</div>";
    }).join("") + "</div>";
  }

  function render() {
    panel.innerHTML = ctxHtml() +
      '<div class="mjy-demo-grid"><div class="mjy-demo-left">' +
      formHtml() + tableHtml() +
      '</div><div class="mjy-demo-right"><p class="mjy-log-title">گزارش رویدادها</p>' +
      logHtml() + "</div></div>" +
      '<p class="mjy-demo-take"><b>برداشت:</b> ' + st.take + "</p>";
  }

  function select(n, focus) {
    cur = n;
    tabs.forEach(function (t) {
      var on = +t.getAttribute("data-sc") === n;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
      if (on) panel.setAttribute("aria-labelledby", t.id);
    });
    st = init(n);
    st.say = "";
    render();
    live.textContent = "";
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () { select(+t.getAttribute("data-sc")); });
    t.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(t);
      var next = -1;
      if (e.key === "ArrowRight") next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === "ArrowLeft") next = (i + 1) % tabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tabs.length - 1;
      if (next > -1) {
        e.preventDefault();
        select(+tabs[next].getAttribute("data-sc"), true);
      }
    });
  });

  panel.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest("[data-act]") : null;
    if (!btn) return;
    var id = btn.getAttribute("data-act");
    var handler = ACT[cur] && ACT[cur][id];
    if (handler) {
      handler(st, panel);
      render();
      live.textContent = st.say || "";
    }
  });

  panel.addEventListener("submit", function (e) {
    if (!e.target.matches("[data-demo-form]")) return;
    e.preventDefault();
    var h = ACT[cur] && ACT[cur].submit;
    if (h) {
      h(st, e.target);
      render();
      live.textContent = st.say || "";
    }
  });

  st = init(1);
  st.say = "";
  render();
})();

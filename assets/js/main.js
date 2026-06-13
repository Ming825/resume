/* =========================================================
   main.js — theme, reveal-on-scroll, notes index loader
   ========================================================= */
(function () {
  "use strict";

  /* ---- Theme (persisted + respects system) ---- */
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  var stored = localStorage.getItem("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = stored || (prefersDark ? "dark" : "light");
  applyTheme(theme);

  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    if (toggle) toggle.textContent = t === "dark" ? "☀" : "☾";
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      theme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem("theme", theme);
      applyTheme(theme);
    });
  }

  /* ---- Year ---- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Notes index ---- */
  var list = document.getElementById("notesList");
  if (!list) return;

  fetch("posts/index.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error("no index"); return r.json(); })
    .then(function (posts) {
      if (!Array.isArray(posts) || posts.length === 0) {
        list.innerHTML = '<p class="note-empty">还没有笔记，敬请期待。</p>';
        return;
      }
      posts.sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
      list.innerHTML = posts.map(function (p) {
        var tag = p.tag ? '<span class="note-tag">' + esc(p.tag) + "</span>" : "";
        return (
          '<a class="note-card" href="post.html?slug=' + encodeURIComponent(p.slug) + '">' +
            '<div class="note-meta"><span>' + esc(p.date || "") + "</span>" + tag + "</div>" +
            "<h3>" + esc(p.title || p.slug) + "</h3>" +
            "<p>" + esc(p.summary || "") + "</p>" +
          "</a>"
        );
      }).join("");
    })
    .catch(function () {
      list.innerHTML = '<p class="note-empty">暂时无法载入笔记。</p>';
    });

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
})();

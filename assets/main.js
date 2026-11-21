(function () {
  "use strict";
  var BP = 768;
  var de = document.documentElement;
  var burger = document.getElementById("burger");
  var drawer = document.getElementById("mobDrawer");
  var overlay = document.getElementById("mobOverlay");
  var closeBtn = document.getElementById("mobClose");

  function openDrawer() {
    if (!drawer) { return; }
    drawer.classList.add("open");
    overlay.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
    de.style.overflow = "hidden";
  }
  function closeDrawer() {
    if (!drawer) { return; }
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    de.style.overflow = "";
  }
  if (burger) { burger.addEventListener("click", function () { drawer.classList.contains("open") ? closeDrawer() : openDrawer(); }); }
  if (closeBtn) { closeBtn.addEventListener("click", closeDrawer); }
  if (overlay) { overlay.addEventListener("click", closeDrawer); }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeDrawer(); } });
  window.addEventListener("resize", function () { if (window.innerWidth > BP) { closeDrawer(); } });
  if (drawer) {
    var links = drawer.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) { links[i].addEventListener("click", closeDrawer); }
  }

  var items = document.querySelectorAll(".faq-item");
  Array.prototype.forEach.call(items, function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) { return; }
    q.addEventListener("click", function () {
      var open = item.classList.contains("open");
      if (open) {
        a.style.maxHeight = "0px";
        item.classList.remove("open");
        q.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });
  window.addEventListener("resize", function () {
    Array.prototype.forEach.call(document.querySelectorAll(".faq-item.open .faq-a"), function (a) { a.style.maxHeight = a.scrollHeight + "px"; });
  });
})();

/* Bubblepaws — global UI (vanilla JS + jQuery) */

(function ($) {
  "use strict";

  // ---------- Sticky nav ----------
  const $nav = $(".nav");
  function onScroll() {
    if (window.scrollY > 40) $nav.addClass("scrolled");
    else $nav.removeClass("scrolled");
  }
  $(window).on("scroll", onScroll);
  onScroll();

  // ---------- Mobile menu ----------
  $(".nav-toggle").on("click", () => $(".mobile-menu").addClass("open"));
  $(".mobile-menu-close, .mobile-menu a").on("click", () =>
    $(".mobile-menu").removeClass("open")
  );

  // ---------- Smooth scroll for in-page anchors ----------
  $('a[href^="#"]').on("click", function (e) {
    const target = $(this).attr("href");
    if (target.length > 1 && $(target).length) {
      e.preventDefault();
      $("html, body").animate(
        { scrollTop: $(target).offset().top - 70 },
        700
      );
    }
  });

  // ---------- Reveal on scroll ----------
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

  // ---------- Counters ----------
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        const dur = 1600;
        const t0 = performance.now();
        function tick(now) {
          const p = Math.min(1, (now - t0) / dur);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(ease * target).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toLocaleString() + (el.dataset.suffix || "");
        }
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll(".counter").forEach((el) => counterIO.observe(el));

  // ---------- Testimonials swiper ----------
  if (window.Swiper && document.querySelector(".testimonial-swiper")) {
    new Swiper(".testimonial-swiper", {
      slidesPerView: 1,
      loop: true,
      autoplay: { delay: 6000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      effect: "fade",
      fadeEffect: { crossFade: true },
    });
  }

  // ---------- FAQ accordion ----------
  $(".faq-q").on("click", function () {
    const $item = $(this).closest(".faq-item");
    const $ans = $item.find(".faq-a");
    if ($item.hasClass("open")) {
      $ans.css("max-height", 0);
      $item.removeClass("open");
    } else {
      $(".faq-item.open").removeClass("open").find(".faq-a").css("max-height", 0);
      $item.addClass("open");
      $ans.css("max-height", $ans[0].scrollHeight + "px");
    }
  });

  // ---------- Active nav link ----------
  const path = window.location.pathname.split("/").pop() || "home.html";
  $(".nav-links a, .mobile-menu a").each(function () {
    const href = $(this).attr("href");
    if (href === path) $(this).addClass("active");
  });
})(jQuery);

/* Gallery filtering + lightbox */
(function ($) {
  "use strict";

  // Filter
  $(".gallery-tab").on("click", function () {
    const filter = $(this).data("filter");
    $(".gallery-tab").removeClass("active");
    $(this).addClass("active");
    $(".gallery-item").each(function () {
      const cats = ($(this).data("cat") || "").toString();
      const show = filter === "all" || cats.split(" ").includes(filter);
      $(this).toggleClass("hidden", !show);
    });
  });

  // Lightbox
  const $lb = $("#lightbox");
  const $lbImg = $lb.find("img");
  let visibleItems = [];
  let idx = 0;

  function refreshVisible() {
    visibleItems = $(".gallery-item:not(.hidden)").toArray();
  }
  function show(i) {
    refreshVisible();
    if (!visibleItems.length) return;
    idx = (i + visibleItems.length) % visibleItems.length;
    const src = $(visibleItems[idx]).find("img").attr("src");
    $lbImg.attr("src", src.replace(/w=\d+/, "w=1600"));
    $lb.addClass("open");
    document.body.style.overflow = "hidden";
  }
  function close() {
    $lb.removeClass("open");
    document.body.style.overflow = "";
  }

  $(document).on("click", ".gallery-item", function () {
    refreshVisible();
    show(visibleItems.indexOf(this));
  });
  $(".lightbox-close").on("click", close);
  $(".lightbox-prev").on("click", () => show(idx - 1));
  $(".lightbox-next").on("click", () => show(idx + 1));
  $lb.on("click", (e) => { if (e.target === $lb[0]) close(); });
  $(document).on("keydown", (e) => {
    if (!$lb.hasClass("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
})(jQuery);

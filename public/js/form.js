/* Contact form — client-side validation only, no backend */
(function ($) {
  "use strict";
  const $form = $("#contactForm");
  if (!$form.length) return;

  function setError($field, msg) {
    $field.addClass("invalid").find(".error").text(msg);
  }
  function clearError($field) {
    $field.removeClass("invalid");
  }

  $form.on("submit", function (e) {
    e.preventDefault();
    let ok = true;
    $form.find(".form-field").each(function () {
      clearError($(this));
    });

    const $name = $form.find('[name="name"]').closest(".form-field");
    const $email = $form.find('[name="email"]').closest(".form-field");
    const $msg = $form.find('[name="message"]').closest(".form-field");

    if (!$name.find("input").val().trim()) { setError($name, "Please tell us your name."); ok = false; }
    const emailVal = $email.find("input").val().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      setError($email, "Please enter a valid email address."); ok = false;
    }
    if ($msg.find("textarea").val().trim().length < 10) {
      setError($msg, "A few more words help us reply properly."); ok = false;
    }

    if (!ok) return;

    const $success = $("#formSuccess");
    $success.addClass("show").html(
      '<strong>Thank you!</strong> Your message has been received. This is a demo form — in the live site it would email Bubblepaws directly.'
    );
    $form[0].reset();
    $("html, body").animate({ scrollTop: $success.offset().top - 120 }, 500);
    setTimeout(() => $success.removeClass("show"), 8000);
  });

  // clear field error on input
  $form.on("input", "input, textarea", function () {
    clearError($(this).closest(".form-field"));
  });
})(jQuery);

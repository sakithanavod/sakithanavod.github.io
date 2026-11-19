/* Small progressive enhancements. The page works fully without this file. */
(function () {
	"use strict";

	/* ---- Mobile menu ---- */
	var toggle = document.querySelector(".menu-toggle");
	var nav = document.getElementById("site-nav");

	if (toggle && nav) {
		var setOpen = function (open) {
			toggle.setAttribute("aria-expanded", String(open));
			toggle.textContent = open ? "Close" : "Menu";
			nav.classList.toggle("is-open", open);
		};

		toggle.addEventListener("click", function () {
			setOpen(toggle.getAttribute("aria-expanded") !== "true");
		});

		// Close after choosing a destination
		nav.addEventListener("click", function (e) {
			if (e.target.closest("a")) setOpen(false);
		});

		// Escape closes and returns focus to the toggle
		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
				setOpen(false);
				toggle.focus();
			}
		});

		// Reset when resizing back to desktop
		var mq = window.matchMedia("(min-width: 981px)");
		var onChange = function () { if (mq.matches) setOpen(false); };
		if (mq.addEventListener) mq.addEventListener("change", onChange);
		else if (mq.addListener) mq.addListener(onChange);
	}

	/* ---- Copy email ---- */
	var copyBtn = document.querySelector(".copy-btn");
	var copyStatus = document.querySelector(".copy-status");

	if (copyBtn && navigator.clipboard && window.isSecureContext) {
		copyBtn.hidden = false;
		var resetTimer;
		copyBtn.addEventListener("click", function () {
			navigator.clipboard.writeText(copyBtn.getAttribute("data-copy")).then(function () {
				copyBtn.textContent = "Copied";
				if (copyStatus) copyStatus.textContent = "Email address copied to clipboard";
				clearTimeout(resetTimer);
				resetTimer = setTimeout(function () {
					copyBtn.textContent = "Copy";
					if (copyStatus) copyStatus.textContent = "";
				}, 2400);
			});
		});
	}
})();

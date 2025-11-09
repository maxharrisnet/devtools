// Ensure this runs only after all elements/resources have rendered
(function () {
	function initVideoModal() {
		// Video popup handlers — support multiple clickable speaker images
		// Select key elements and guard against missing nodes
		const closeBtn = document.getElementById('closePopup');
		const videoPopupEl = document.getElementById('videoPopup');
		const vimeoIframe = document.getElementById('vimeoVideo');

		// Helper to open popup with a given src (adds autoplay)
		const openVideoPopup = (src) => {
			if (!vimeoIframe || !videoPopupEl) return;
			// normalize src: remove any existing autoplay then add autoplay=1
			let normalized = (src || '').replace(/([&?])autoplay=1/g, '');
			normalized = normalized.replace(/&amp;/g, '&');
			normalized += normalized.includes('?') ? '&autoplay=1' : '?autoplay=1';
			vimeoIframe.src = normalized;
			videoPopupEl.style.display = 'flex';
		};

		// Close handler (hide and remove autoplay)
		if (closeBtn) {
			closeBtn.addEventListener('click', () => {
				if (videoPopupEl) videoPopupEl.style.display = 'none';
				if (vimeoIframe) vimeoIframe.src = (vimeoIframe.src || '').replace(/([&?])autoplay=1/g, '');
			});
		}

		// Click outside to close
		if (videoPopupEl) {
			videoPopupEl.addEventListener('click', (e) => {
				if (e.target === videoPopupEl) {
					videoPopupEl.style.display = 'none';
					if (vimeoIframe) vimeoIframe.src = (vimeoIframe.src || '').replace(/([&?])autoplay=1/g, '');
				}
			});
		}

		// Attach click handlers to every speaker image inside the speaker-details blocks
		try {
			const selector = `.${s.ddm__keynoteCol1} img`;
			const speakerImgs = document.querySelectorAll(selector);
			speakerImgs.forEach((img) => {
				// make clickable
				img.style.cursor = 'pointer';
				// allow keyboard activation
				img.setAttribute('tabindex', '0');
				img.addEventListener('click', () => {
					const src = img.getAttribute('data-vimeo-src') || img.getAttribute('data-src') || img.src;
					openVideoPopup(src);
				});
				img.addEventListener('keydown', (ev) => {
					if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') img.click();
				});
			});
		} catch (err) {
			// if for some reason selector or s isn't available, silently fail
			console.warn('Could not attach speaker image video handlers', err);
		}

		// Smooth-scroll handlers (require jQuery)
		if (window.$) {
			$('#testdrivebtn, #register, #registertoday, #saveseat').click(function () {
				$('html, body').animate(
					{
						scrollTop: $('#ddmslider').offset().top,
					},
					1000
				);
			});
		}
	}

	// Run when everything (including images/resources) has loaded
	if (document.readyState === 'complete') {
		initVideoModal();
	} else {
		window.addEventListener('load', initVideoModal);
	}
})();

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      navigation.classList.remove('is-open');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      navigation.classList.remove('is-open');
      menuToggle.focus();
    }
  });
}

const imageModal = document.querySelector('#image-modal');
const modalImage = document.querySelector('#modal-image');
const modalCaption = document.querySelector('#modal-caption');

if (imageModal && modalImage && modalCaption) {
  document.querySelectorAll('.gallery-image-button').forEach((button) => {
    button.addEventListener('click', () => {
      const imageUrl = button.dataset.image;
      const imageDescription = button.dataset.alt || 'Gallery image';
      const title = button.closest('.gallery-card')?.querySelector('h3')?.textContent || imageDescription;
      modalImage.src = imageUrl;
      modalImage.alt = imageDescription;
      modalCaption.textContent = title;
      imageModal.showModal();
    });
  });

  imageModal.querySelector('.modal-close')?.addEventListener('click', () => imageModal.close());
  imageModal.addEventListener('click', (event) => {
    if (event.target === imageModal) imageModal.close();
  });
  imageModal.addEventListener('close', () => {
    modalImage.removeAttribute('src');
    modalImage.alt = '';
  });
}

const inquiryForm = document.querySelector('#inquiry-form');
const formStatus = document.querySelector('#form-status');

if (inquiryForm && formStatus) {
  inquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!inquiryForm.reportValidity()) return;

    const formData = new FormData(inquiryForm);
    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const interest = String(formData.get('interest') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const smsBody = [
      'Hello Top Comet, I have an inquiry.',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Topic: ${interest}`,
      `Message: ${message}`,
    ].join('\n');
    const smsLink = document.createElement('a');
    smsLink.href = `sms:+959959359423?body=${encodeURIComponent(smsBody)}`;
    smsLink.setAttribute('aria-hidden', 'true');
    smsLink.tabIndex = -1;
    document.body.appendChild(smsLink);
    smsLink.click();
    smsLink.remove();

    formStatus.textContent = 'Your message draft is ready in your messaging app. Review it, then tap Send. This website does not store or send your inquiry automatically.';
  });
}

const year = document.querySelector('#current-year');
if (year) year.textContent = String(new Date().getFullYear());

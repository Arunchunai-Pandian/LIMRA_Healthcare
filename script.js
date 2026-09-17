/**
 * LIMRA India–Philippines Healthcare Partnerships
 * Client Interactions & Editorial Micro-Behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header scroll handling
  const header = document.getElementById('main-header');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Drawer Navigation
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeMobileDrawer = document.getElementById('close-mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    mobileDrawer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.add('hidden');
    document.body.style.overflow = '';
  };

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', openDrawer);
  }
  if (closeMobileDrawer) {
    closeMobileDrawer.addEventListener('click', closeDrawer);
  }
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Collaboration Inquiry Modal
  const modal = document.getElementById('inquiry-modal');
  const openModalBtns = document.querySelectorAll('.open-inquiry-modal');
  const closeModalBtns = document.querySelectorAll('.close-inquiry-modal');
  const inquiryForm = document.getElementById('inquiry-form');
  const inquirySuccess = document.getElementById('inquiry-success');

  const openModal = (interestTopic = '') => {
    if (modal) {
      if (interestTopic && inquiryForm && inquiryForm.elements['partnership_interest']) {
        inquiryForm.elements['partnership_interest'].value = interestTopic;
      }
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
      if (inquirySuccess) inquirySuccess.classList.add('hidden');
      if (inquiryForm) inquiryForm.classList.remove('hidden');
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const topic = btn.getAttribute('data-topic') || '';
      openModal(topic);
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Form submission handler with Web3Forms integration
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const origText = submitBtn ? submitBtn.innerText : 'Submit';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting...';
      }

      try {
        const formData = new FormData(inquiryForm);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (data.success) {
          inquiryForm.classList.add('hidden');
          if (inquirySuccess) inquirySuccess.classList.remove('hidden');
        } else {
          alert('Submission Error: ' + (data.message || 'Please check your Web3Forms Access Key.'));
        }
      } catch (err) {
        console.error('Web3Forms dispatch error:', err);
        alert('Network connection error. Please try again.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = origText;
        }
      }
    });
  }

  // 4. Value Creation Bilateral Tabs (Philippines vs India)
  const tabPhilippines = document.getElementById('tab-philippines');
  const tabIndia = document.getElementById('tab-india');
  const panelPhilippines = document.getElementById('panel-philippines');
  const panelIndia = document.getElementById('panel-india');

  if (tabPhilippines && tabIndia && panelPhilippines && panelIndia) {
    tabPhilippines.addEventListener('click', () => {
      tabPhilippines.classList.add('bg-[#26265F]', 'text-white');
      tabPhilippines.classList.remove('bg-white', 'text-[#26265F]');
      tabIndia.classList.remove('bg-[#26265F]', 'text-white');
      tabIndia.classList.add('bg-white', 'text-[#26265F]');
      panelPhilippines.classList.remove('hidden');
      panelIndia.classList.add('hidden');
    });

    tabIndia.addEventListener('click', () => {
      tabIndia.classList.add('bg-[#26265F]', 'text-white');
      tabIndia.classList.remove('bg-white', 'text-[#26265F]');
      tabPhilippines.classList.remove('bg-[#26265F]', 'text-white');
      tabPhilippines.classList.add('bg-white', 'text-[#26265F]');
      panelIndia.classList.remove('hidden');
      panelPhilippines.classList.add('hidden');
    });
  }
});

// ==================== PORTFOLIO JAVASCRIPT ====================
// Organized and modular JavaScript for portfolio website
// Author: Ranbeer Singh Chauhan
// ============================================================

// ==================== UTILITY FUNCTIONS ====================

/**
 * Debounce function to limit the rate of function execution
 * @param {Function} func - Function to debounce
 * @param {Number} wait - Wait time in milliseconds
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if element is in viewport
 * @param {Element} el - DOM element to check
 */
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) + 100 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ==================== CUSTOM CURSOR ====================

function initCustomCursor() {
  const innerCursor = document.querySelector(".inner-cursor");
  const outerCursor = document.querySelector(".outer-cursor");

  if (!innerCursor || !outerCursor) return;

  // Track cursor movement
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    innerCursor.style.left = `${x}px`;
    innerCursor.style.top = `${y}px`;
    outerCursor.style.left = `${x}px`;
    outerCursor.style.top = `${y}px`;
  });

  // Grow cursor on hoverable elements
  const hoverElements = document.querySelectorAll(
    "a, button, .service-card, .portfolio-item, .skill-orb, input, textarea"
  );

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () =>
      innerCursor.classList.add("grow")
    );
    element.addEventListener("mouseleave", () =>
      innerCursor.classList.remove("grow")
    );
  });
}

// ==================== DARK MODE ====================

function initDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const icon = darkModeToggle.querySelector("i");

  // Check for saved dark mode preference
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "enabled") {
    body.classList.add("dark-mode");
    icon.classList.replace("fa-moon", "fa-sun");
  }

  // Toggle dark mode
  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("darkMode", "enabled");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("darkMode", "disabled");
    }
  });
}

// ==================== HEADER & NAVIGATION ====================

function initHeader() {
  const header = document.getElementById("header");

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function initMobileMenu() {
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const menuIcon = mobileToggle.querySelector("i");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");
  });

  // Close menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      const menuIcon = mobileToggle.querySelector("i");
      menuIcon.classList.replace("fa-times", "fa-bars");
    });
  });
}

function initActiveNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightNavigation() {
    const scrollY = window.pageYOffset;
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(
          `.nav-link[href="#${sectionId}"]`
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });

    // Default to home if at top
    if (scrollY < 100) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const homeLink = document.querySelector('.nav-link[href="#home"]');
      if (homeLink) homeLink.classList.add("active");
    }
  }

  window.addEventListener("scroll", debounce(highlightNavigation, 50));
  document.addEventListener("DOMContentLoaded", highlightNavigation);
}

// ==================== SMOOTH SCROLL ====================

function initSmoothScroll() {
  const header = document.getElementById("header");

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });
}

// ==================== SCROLL TO TOP ====================

function initScrollToTop() {
  const scrollTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==================== EMAIL COPY ====================

function initEmailCopy() {
  const emailText = document.getElementById("emailText");
  const copyTooltip = document.getElementById("copyTooltip");

  if (!emailText || !copyTooltip) return;

  emailText.addEventListener("click", () => {
    const email = "ranbeersinghcauhan@gmail.com";

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(email)
        .then(() => showCopyTooltip())
        .catch(() => copyToClipboardFallback(email));
    } else {
      copyToClipboardFallback(email);
    }
  });

  function copyToClipboardFallback(text) {
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    tempInput.style.position = "fixed";
    tempInput.style.opacity = "0";
    document.body.appendChild(tempInput);
    tempInput.select();

    try {
      document.execCommand("copy");
      showCopyTooltip();
    } catch (err) {
      console.error("Failed to copy:", err);
    }

    document.body.removeChild(tempInput);
  }

  function showCopyTooltip() {
    copyTooltip.classList.add("show");
    setTimeout(() => copyTooltip.classList.remove("show"), 2000);
  }
}

// ==================== CONTACT FORM ====================

function initContactForm() {
  const submitBtn = document.getElementById("submitBtn");
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const subjectInput = document.getElementById("subjectInput");
  const messageInput = document.getElementById("messageInput");

  if (!submitBtn) return;

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Validation
    if (
      !nameInput.value.trim() ||
      !emailInput.value.trim() ||
      !subjectInput.value.trim() ||
      !messageInput.value.trim()
    ) {
      alert("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      alert("Please enter a valid email address");
      return;
    }

    alert("Thank you for your message! I will get back to you soon.");

    // Clear form
    nameInput.value = "";
    emailInput.value = "";
    subjectInput.value = "";
    messageInput.value = "";
  });
}

// ==================== SERVICE MODAL ====================

function initServiceCards() {
  const serviceCards = document.querySelectorAll(".service-card");
  const services = [
    {
      title: "Web Development",
      description:
        "Web development services are used to design, build, support, and evolve all types of web-based software.",
      features: ["Web application development", "Testing", "Maintenance"],
    },
    {
      title: "UI/UX Consultancy",
      description:
        "UX consulting helps companies improve their product's overall usability and optimize expenses.",
      features: [
        "Establish the right UX processes",
        "Create exceptional user experiences",
        "Discover new business opportunities",
        "Save resources",
      ],
    },
    {
      title: "iOS Development",
      description:
        "iOS is Apple's mobile OS that runs on an iPhone, iPad, iPod Touch hardware.",
      features: ["Application Design", "Build App", "Testing", "Maintenance"],
    },
  ];

  serviceCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const service = services[index];
      const featuresText = service.features.map((f) => `• ${f}`).join("\n");
      alert(
        `${service.title}\n\n${service.description}\n\nWhat I provide:\n${featuresText}`
      );
    });
  });
}

// ==================== ANIMATIONS ====================

function initScrollAnimations() {
  const elements = document.querySelectorAll(
    ".glass-card, .skill-orb, .award-card, .portfolio-item"
  );

  // Set initial state
  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
  });

  function handleScrollAnimation() {
    elements.forEach((el) => {
      if (isElementInViewport(el)) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    });
  }

  window.addEventListener("scroll", debounce(handleScrollAnimation, 100));
  setTimeout(handleScrollAnimation, 100);
}

function initScrollReveal() {
  if (typeof ScrollReveal === "undefined") return;

  ScrollReveal({ reset: true, distance: "60px", duration: 2500, delay: 100 });

  // Section titles
  ScrollReveal().reveal(".section-title-01, .section-title-02", {
    delay: 300,
    origin: "top",
  });

  // Hero section
  ScrollReveal().reveal(".hero-title, .hero-subtitle", {
    delay: 500,
    origin: "left",
  });
  ScrollReveal().reveal(".hero-text, .hero-status", {
    delay: 600,
    origin: "right",
  });
  ScrollReveal().reveal(".btn-primary", { delay: 700, origin: "bottom" });
  ScrollReveal().reveal(".hero-image", { delay: 500, origin: "bottom" });

  // About section
  ScrollReveal().reveal(".about-image", { delay: 500, origin: "left" });
  ScrollReveal().reveal(".about-content", { delay: 600, origin: "right" });

  // Skills, awards, services
  ScrollReveal().reveal(".skill-orb, .award-card, .service-card", {
    delay: 200,
    origin: "bottom",
    interval: 200,
  });

  // Timeline
  ScrollReveal().reveal(".timeline-item", {
    delay: 300,
    origin: "left",
    interval: 300,
  });

  // Portfolio
  ScrollReveal().reveal(".portfolio-item", {
    delay: 300,
    origin: "bottom",
    interval: 200,
  });

  // Contact
  ScrollReveal().reveal(".contact-info", { delay: 500, origin: "left" });
  ScrollReveal().reveal(".contact-form-wrapper", {
    delay: 600,
    origin: "right",
  });

  // Footer
  ScrollReveal().reveal("footer .group", {
    delay: 500,
    origin: "bottom",
    interval: 200,
  });

  // Social media icons
  ScrollReveal().reveal(".fixed-social-icons a", {
    delay: 500,
    origin: "left",
    interval: 200,
  });
}

// ==================== PARALLAX EFFECTS ====================

function initParallaxEffect() {
  const heroImage = document.querySelector(".hero-image img");
  if (!heroImage) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    if (scrolled < window.innerHeight) {
      heroImage.style.transform = `translateY(${rate}px)`;
    }
  });
}

function animateTimelineDots() {
  const timelineDots = document.querySelectorAll(".timeline-dot");

  timelineDots.forEach((dot, index) => {
    if (isElementInViewport(dot)) {
      setTimeout(() => {
        dot.style.animation = "pulse 2s ease-in-out infinite";
      }, index * 200);
    }
  });
}

// ==================== EXPERIENCE SECTION ====================

function initExperienceAnimations() {
  const experienceItems = document.querySelectorAll(".experience-item");
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  experienceItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(item);
  });
}

// ==================== SKILLS STACK ANIMATION ====================

function initSkillsStack() {
  const cards = document.querySelectorAll(".skill-category-card");
  const container = document.querySelector(".skills-stack-container");
  if (!container) return;

  function updateStack() {
    const containerRect = container.getBoundingClientRect();
    const containerHeight = containerRect.height - window.innerHeight;
    const scrollProgress = Math.max(
      0,
      Math.min(1, -containerRect.top / containerHeight)
    );

    const totalCards = cards.length;
    const stackSpacing = 70;

    cards.forEach((card, index) => {
      const cardStart = index / totalCards;
      const cardEnd = (index + 1) / totalCards;
      let cardProgress = (scrollProgress - cardStart) / (cardEnd - cardStart);
      cardProgress = Math.max(0, Math.min(1, cardProgress));

      if (scrollProgress < cardStart) {
        // Card hasn't appeared yet
        card.style.transform = `translateX(-50%) translateY(200px) scale(0.85)`;
        card.style.opacity = 0;
        card.style.zIndex = index + 1;
        card.style.pointerEvents = "none";
      } else if (scrollProgress >= cardStart && scrollProgress < cardEnd) {
        // Card is animating in
        const scale = 0.85 + cardProgress * 0.15;
        const yOffset = (1 - cardProgress) * 200;
        const opacity = 0.3 + cardProgress * 0.7;
        const finalStackY = index * stackSpacing;

        card.style.transform = `translateX(-50%) translateY(${
          yOffset + finalStackY
        }px) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = index + 1;
        card.style.pointerEvents = cardProgress > 0.6 ? "auto" : "none";
      } else {
        // Card is stacked
        const stackY = index * stackSpacing;
        card.style.transform = `translateX(-50%) translateY(${stackY}px) scale(1)`;
        card.style.opacity = 1;
        card.style.zIndex = index + 1;
        card.style.pointerEvents = "auto";
      }
    });
  }

  window.addEventListener("scroll", updateStack);
  window.addEventListener("resize", updateStack);
  updateStack();
}

// ==================== FIXED ACHIEVEMENTS HORIZONTAL SCROLL ====================
// Ensures all cards reach the middle before allowing vertical scroll

function initAchievementsScroll() {
  const achievementsContainer = document.querySelector(
    ".achievements-scroll-container"
  );
  const achievementsTrack = document.querySelector(
    ".achievements-track-horizontal"
  );

  if (!achievementsContainer || !achievementsTrack) return;

  function updateAchievementsScroll() {
    const containerRect = achievementsContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight / 2;

    const containerTop = containerRect.top;
    const containerBottom = containerRect.bottom;

    // Only scroll horizontally when container is in the middle of viewport
    if (containerTop <= triggerPoint && containerBottom >= triggerPoint) {
      // Calculate scroll progress within the container
      const scrollDistance = triggerPoint - containerTop;
      const containerHeight = containerRect.height;
      const scrollProgress = Math.max(
        0,
        Math.min(1, scrollDistance / containerHeight)
      );

      // Calculate maximum horizontal scroll
      const trackWidth = achievementsTrack.scrollWidth;
      const containerWidth = window.innerWidth;
      const maxScroll = trackWidth - containerWidth;

      // Apply horizontal translation
      const translateX = -(scrollProgress * maxScroll);
      achievementsTrack.style.transform = `translateX(${translateX}px)`;

      // Lock vertical scrolling when not at start or end
      if (scrollProgress > 0.05 && scrollProgress < 0.95) {
        // Prevent body scroll
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo(0, scrollTop);
      }
    }
  }

  // Use requestAnimationFrame for smooth scrolling
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateAchievementsScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial call
  updateAchievementsScroll();
}

// ==================== CERTIFICATE MODAL ====================

function initCertificateModal() {
  const certModal = document.getElementById("certModal");
  const achievementCards = document.querySelectorAll(".achievement-card");
  const modalBody = document.querySelector(".cert-modal-body");
  const modalClose = document.querySelector(".cert-modal-close");
  const modalOverlay = document.querySelector(".cert-modal-overlay");

  if (!certModal) return;

  achievementCards.forEach((card) => {
    card.addEventListener("click", () => {
      const certPath = card.getAttribute("data-cert");
      const certType = card.getAttribute("data-type");
      if (!certPath) return;

      modalBody.innerHTML = "";

      if (certType === "image") {
        const img = document.createElement("img");
        img.src = card.querySelector(".cert-preview-content img").src;
        img.alt = "Certificate";
        modalBody.appendChild(img);
      } else {
        const iframe = document.createElement("iframe");
        iframe.src = certPath;
        modalBody.appendChild(iframe);
      }

      certModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    certModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && certModal.classList.contains("active")) {
      closeModal();
    }
  });
}

// ==================== INITIALIZATION ====================

document.addEventListener("DOMContentLoaded", () => {
  // Core features
  initCustomCursor();
  initDarkMode();
  initHeader();
  initMobileMenu();
  initActiveNavigation();
  initSmoothScroll();
  initScrollToTop();

  // Form features
  initEmailCopy();
  initContactForm();

  // Interactive features
  initServiceCards();
  initCertificateModal();

  // Animations
  initScrollAnimations();
  initScrollReveal();
  initParallaxEffect();
  initExperienceAnimations();

  // Section-specific features
  initSkillsStack();
  initAchievementsScroll();

  // Timeline animations
  window.addEventListener("scroll", debounce(animateTimelineDots, 100));

  // Skill orbs random animation delays
  const skillOrbs = document.querySelectorAll(".skill-orb");
  skillOrbs.forEach((orb) => {
    orb.style.animationDelay = `${Math.random() * 2}s`;
  });

  // Log successful initialization
  console.log("🚀 Portfolio initialized successfully!");
  console.log(
    "✅ Dark mode:",
    document.body.classList.contains("dark-mode") ? "enabled" : "disabled"
  );
});

// ==================== GALLERY LIGHTBOX ====================

function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (!img) return;

      // Create lightbox
      const lightbox = document.createElement("div");
      lightbox.className = "gallery-lightbox active";
      lightbox.innerHTML = `
        <div class="gallery-lightbox-overlay"></div>
        <div class="gallery-lightbox-content">
          <button class="gallery-lightbox-close">&times;</button>
          <img src="${img.src}" alt="${img.alt}" />
          <div class="gallery-lightbox-info">
            <h3>${item.querySelector(".gallery-title")?.textContent || ""}</h3>
            <p>${
              item.querySelector(".gallery-description")?.textContent || ""
            }</p>
          </div>
        </div>
      `;

      document.body.appendChild(lightbox);
      document.body.style.overflow = "hidden";

      // Close handlers
      const closeBtn = lightbox.querySelector(".gallery-lightbox-close");
      const overlay = lightbox.querySelector(".gallery-lightbox-overlay");

      function closeLightbox() {
        lightbox.classList.remove("active");
        setTimeout(() => {
          if (document.body.contains(lightbox)) {
            document.body.removeChild(lightbox);
          }
          document.body.style.overflow = "";
        }, 300);
      }

      closeBtn.addEventListener("click", closeLightbox);
      overlay.addEventListener("click", closeLightbox);

      // ESC key handler
      const escHandler = (e) => {
        if (e.key === "Escape") {
          closeLightbox();
          document.removeEventListener("keydown", escHandler);
        }
      };
      document.addEventListener("keydown", escHandler);
    });
  });
}

// ==================== ACHIEVEMENTS HORIZONTAL SCROLL ====================

function initAchievementsScroll() {
  const achievementsContainer = document.querySelector(
    ".achievements-scroll-container"
  );
  const achievementsTrack = document.querySelector(
    ".achievements-track-horizontal"
  );

  if (!achievementsContainer || !achievementsTrack) {
    console.log("Achievements containers not found");
    return;
  }

  let isScrolling = false;

  function updateAchievementsScroll() {
    const containerRect = achievementsContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.3;

    const containerTop = containerRect.top;
    const containerBottom = containerRect.bottom;

    // Check if container is in viewport
    if (containerTop <= triggerPoint && containerBottom >= windowHeight * 0.7) {
      isScrolling = true;

      // Calculate scroll progress
      const scrollDistance = Math.abs(containerTop - triggerPoint);
      const containerHeight = containerRect.height - windowHeight;
      const scrollProgress = Math.max(
        0,
        Math.min(1, scrollDistance / containerHeight)
      );

      // Calculate horizontal translation
      const trackWidth = achievementsTrack.scrollWidth;
      const containerWidth = achievementsContainer.offsetWidth;
      const maxScroll = Math.max(0, trackWidth - containerWidth);

      const translateX = -(scrollProgress * maxScroll);
      achievementsTrack.style.transform = `translateX(${translateX}px)`;
    } else {
      isScrolling = false;
    }
  }

  // Throttled scroll handler
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateAchievementsScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Update on resize
  window.addEventListener("resize", updateAchievementsScroll);

  // Initial call
  updateAchievementsScroll();
}

// ==================== CERTIFICATE MODAL ====================

function initCertificateModal() {
  const certModal = document.getElementById("certModal");
  const achievementCards = document.querySelectorAll(".achievement-card");
  const modalBody = document.querySelector(".cert-modal-body");
  const modalClose = document.querySelector(".cert-modal-close");
  const modalOverlay = document.querySelector(".cert-modal-overlay");

  if (!certModal) {
    console.log("Certificate modal not found");
    return;
  }

  achievementCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Prevent triggering when clicking on preview
      if (e.target.closest(".cert-preview-float")) return;

      const certPath = card.getAttribute("data-cert");
      const certType = card.getAttribute("data-type");

      if (!certPath) {
        console.log("No certificate path found");
        return;
      }

      modalBody.innerHTML = "";

      if (certType === "image" || certType === "pdf") {
        // Try to get the preview image source
        const previewImg = card.querySelector(
          ".cert-preview-content img, .cert-preview-content iframe"
        );

        if (previewImg && previewImg.tagName === "IMG") {
          const img = document.createElement("img");
          img.src = previewImg.src;
          img.alt = "Certificate";
          img.onerror = () => {
            console.error("Failed to load certificate image");
            modalBody.innerHTML =
              '<p style="color: white; text-align: center; padding: 2rem;">Certificate image could not be loaded</p>';
          };
          modalBody.appendChild(img);
        } else if (certType === "pdf") {
          const iframe = document.createElement("iframe");
          iframe.src = certPath;
          iframe.onerror = () => {
            console.error("Failed to load certificate PDF");
          };
          modalBody.appendChild(iframe);
        } else {
          // Fallback: try direct path
          const img = document.createElement("img");
          img.src = `images/${certPath}`;
          img.alt = "Certificate";
          img.onerror = () => {
            console.error("Failed to load certificate");
            modalBody.innerHTML =
              '<p style="color: white; text-align: center; padding: 2rem;">Certificate could not be loaded</p>';
          };
          modalBody.appendChild(img);
        }
      }

      certModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    certModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

  // ESC key handler
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && certModal.classList.contains("active")) {
      closeModal();
    }
  });
}

// ==================== MASONRY LAYOUT ====================

// function initMasonryLayout() {
//   const gallery = document.querySelector(".masonry-gallery");
//   if (!gallery) return;

//   const items = gallery.querySelectorAll(".gallery-item");

//   // Stagger animation
//   items.forEach((item, index) => {
//     item.style.opacity = "0";
//     item.style.transform = "translateY(30px)";

//     setTimeout(() => {
//       item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
//       item.style.opacity = "1";
//       item.style.transform = "translateY(0)";
//     }, index * 100);
//   });

//   // Lazy load images
//   const imageObserver = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           const img = entry.target;
//           if (img.dataset.src) {
//             img.src = img.dataset.src;
//             img.removeAttribute("data-src");
//           }
//           imageObserver.unobserve(img);
//         }
//       });
//     },
//     { rootMargin: "50px" }
//   );

//   items.forEach((item) => {
//     const img = item.querySelector("img");
//     if (img) imageObserver.observe(img);
//   });
// }

function initMasonryLayout() {
  const gallery = document.querySelector(".masonry-gallery");
  if (!gallery) return;

  const items = gallery.querySelectorAll(".gallery-item");

  // Function to calculate and apply masonry layout
  function applyMasonryLayout() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // On mobile, reset any transforms and use CSS flexbox/grid
      items.forEach((item) => {
        item.style.position = "relative";
        item.style.left = "auto";
        item.style.top = "auto";
      });
    } else {
      // On desktop, maintain horizontal masonry layout
      const columnCount = window.innerWidth <= 1024 ? 2 : 3;
      const columnWidth = gallery.offsetWidth / columnCount;
      const columnHeights = new Array(columnCount).fill(0);
      const gap = 20; // Adjust based on your CSS gap

      items.forEach((item) => {
        // Find shortest column
        const shortestColumn = columnHeights.indexOf(
          Math.min(...columnHeights)
        );

        // Position item
        item.style.position = "absolute";
        item.style.left = `${shortestColumn * columnWidth}px`;
        item.style.top = `${columnHeights[shortestColumn]}px`;
        item.style.width = `${columnWidth - gap}px`;

        // Update column height
        columnHeights[shortestColumn] += item.offsetHeight + gap;
      });

      // Set container height
      gallery.style.height = `${Math.max(...columnHeights)}px`;
      gallery.style.position = "relative";
    }
  }

  // Stagger animation on load
  items.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";

    setTimeout(() => {
      item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Apply layout after images load
  let imagesLoaded = 0;
  const totalImages = items.length;

  items.forEach((item) => {
    const img = item.querySelector("img");
    if (img) {
      if (img.complete) {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
          applyMasonryLayout();
        }
      } else {
        img.addEventListener("load", () => {
          imagesLoaded++;
          if (imagesLoaded === totalImages) {
            applyMasonryLayout();
          }
        });
      }
    }
  });

  // Reapply layout on window resize with debounce
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      applyMasonryLayout();
    }, 250);
  });

  // Lazy load images
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            img.addEventListener("load", applyMasonryLayout);
          }
          imageObserver.unobserve(img);
        }
      });
    },
    { rootMargin: "50px" }
  );

  items.forEach((item) => {
    const img = item.querySelector("img");
    if (img) imageObserver.observe(img);
  });

  // Initial layout call
  setTimeout(applyMasonryLayout, 100);
}

// ==================== INITIALIZE ALL ====================

document.addEventListener("DOMContentLoaded", () => {
  console.log("🎨 Initializing Gallery and Achievements...");

  initGalleryLightbox();
  initAchievementsScroll();
  initCertificateModal();
  initMasonryLayout();

  console.log("✅ Gallery and Achievements initialized!");
});

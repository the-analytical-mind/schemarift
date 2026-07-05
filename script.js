const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const faqItems = document.querySelectorAll(".faq-item");
const revealElements = document.querySelectorAll(".reveal");
const backToTopButton = document.querySelector(".back-to-top");
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");

    document.body.classList.toggle("menu-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (!navToggle || !navMenu) {
      return;
    }

    navMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

faqItems.forEach(function (item) {
  const button = item.querySelector("button");
  const icon = item.querySelector("strong");

  if (!button) {
    return;
  }

  button.addEventListener("click", function () {
    const isOpen = item.classList.contains("open");

    faqItems.forEach(function (faqItem) {
      const faqButton = faqItem.querySelector("button");
      const faqIcon = faqItem.querySelector("strong");

      faqItem.classList.remove("open");

      if (faqButton) {
        faqButton.setAttribute("aria-expanded", "false");
      }

      if (faqIcon) {
        faqIcon.textContent = "+";
      }
    });

    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");

      if (icon) {
        icon.textContent = "-";
      }
    }
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(function (element) {
    element.classList.add("visible");
  });
}

function updateScrollState() {
  const currentScroll = window.scrollY;

  if (backToTopButton) {
    backToTopButton.classList.toggle("visible", currentScroll > 560);
  }

  document.querySelectorAll("section[id]").forEach(function (section) {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
      navLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "#" + sectionId);
      });
    }
  });
}

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("load", updateScrollState);

if (backToTopButton) {
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

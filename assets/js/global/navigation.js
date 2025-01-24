/**
 * @file navigation.js
 * @description Initializes and manages the navigation menu, submenu interactions, and section highlighting for both desktop and mobile views
 */

export function initializeNavigation() {
  const requiredElements = {
    navWrapper: document.getElementById("nav-wrapper"),
    menuItems: document.querySelectorAll("#top-menu > li"),
    submenu: document.getElementById("submenu"),
    submenuContent: document.getElementById("submenu-content"),
    submenuGrid: document.getElementById("submenu-grid"),
    dashedBorder: document.getElementById("dashed-border"),
    mobileMenuButton: document.querySelector(".navbar-burger"),
    topMenu: document.getElementById("top-menu"),
    mobileMenu: document.querySelector(".navbar-menu"),
    mobileMenuClose: document.querySelector(".navbar-close"),
    mobileMenuBackdrop: document.querySelector(".navbar-backdrop"),
  };

  // Check for missing elements and log detailed information
  const missingElements = Object.entries(requiredElements)
    .filter(
      ([key, element]) =>
        !element || (element instanceof NodeList && element.length === 0)
    )
    .map(([key]) => key);

  if (missingElements.length > 0) {
    console.error(
      "Error initializing navigation: The following required elements were not found:",
      missingElements
    );
    return; // Exit the function if required elements are missing
  }

  let timeoutId;

  function showSubmenu(menuItem) {
    if (window.innerWidth < 1024) return; // Don't show submenu on mobile

    clearTimeout(timeoutId);
    const submenuLinks =
      menuItem.querySelector("[role='menu']")?.innerHTML || "";
    const sectionTitle = menuItem.querySelector("a")?.textContent || "";

    requiredElements.submenuGrid.innerHTML = `
      <div class="col-start-4 col-span-1">
        <h3 class="text-sm text-neutral-600 mb-2">Explore ${sectionTitle}</h3>
        <ul class="space-y-2 text-right">
          ${submenuLinks}
        </ul>
      </div>
    `;

    requiredElements.submenu.classList.remove("h-0");
    requiredElements.submenu.classList.add("h-auto");
    requiredElements.submenuContent.classList.remove("opacity-0");
    requiredElements.submenuContent.classList.add("opacity-100");

    const submenuHeight = requiredElements.submenu.offsetHeight;
    requiredElements.dashedBorder.style.transform = `translateY(${submenuHeight}px)`;

    menuItem.querySelector("a")?.setAttribute("aria-expanded", "true");
    requiredElements.submenu.setAttribute("aria-hidden", "false");
  }

  function hideSubmenu() {
    if (window.innerWidth < 1024) return; // Don't hide submenu on mobile

    requiredElements.submenuContent.classList.remove("opacity-100");
    requiredElements.submenuContent.classList.add("opacity-0");
    timeoutId = setTimeout(() => {
      requiredElements.submenu.classList.remove("h-auto");
      requiredElements.submenu.classList.add("h-0");
      requiredElements.dashedBorder.style.transform = "translateY(0)";

      requiredElements.menuItems.forEach((item) => {
        item.querySelector("a")?.setAttribute("aria-expanded", "false");
      });
      requiredElements.submenu.setAttribute("aria-hidden", "true");
    }, 200);
  }

  function handleMenuItemInteraction(event) {
    if (window.innerWidth < 1024) return; // Don't handle on mobile

    const menuItem = event.currentTarget;
    if (
      event.type === "mouseenter" ||
      (event.type === "focus" && !menuItem.classList.contains("active"))
    ) {
      showSubmenu(menuItem);
    }
  }

  function setupMobileMenu() {
    const parentSections = document.querySelectorAll(
      ".navbar-menu .parent-section"
    );

    parentSections.forEach((section) => {
      section.addEventListener("click", (e) => {
        e.preventDefault();
        const submenu = section.nextElementSibling;
        if (submenu && submenu.classList.contains("submenu")) {
          // Toggle the 'selected' class on the parent section
          section.classList.toggle("selected");

          // Toggle the submenu visibility
          submenu.classList.toggle("hidden");

          // Rotate the arrow
          section.querySelector("svg")?.classList.toggle("rotate-180");

          // Close other open submenus
          parentSections.forEach((otherSection) => {
            if (otherSection !== section) {
              otherSection.classList.remove("selected");
              const otherSubmenu = otherSection.nextElementSibling;
              if (otherSubmenu && otherSubmenu.classList.contains("submenu")) {
                otherSubmenu.classList.add("hidden");
                otherSection
                  .querySelector("svg")
                  ?.classList.remove("rotate-180");
              }
            }
          });
        }
      });
    });
  }

  function toggleMobileMenu() {
    requiredElements.mobileMenu.classList.toggle("hidden");
    document.body.classList.toggle("overflow-hidden");
  }

  // Intersection Observer setup
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const menuItem = document.querySelector(
        `#top-menu a[href="#${id}"]`
      )?.parentElement;

      if (entry.isIntersecting) {
        menuItem?.classList.add("active");
      } else {
        menuItem?.classList.remove("active");
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all sections
  document.querySelectorAll("section[id]").forEach((section) => {
    observer.observe(section);
  });

  // Event listeners
  requiredElements.menuItems.forEach((item) => {
    item.addEventListener("mouseenter", handleMenuItemInteraction);
    item.addEventListener("focus", handleMenuItemInteraction, true);
  });

  requiredElements.submenu.addEventListener("mouseenter", () =>
    clearTimeout(timeoutId)
  );

  requiredElements.navWrapper.addEventListener("mouseleave", hideSubmenu);
  requiredElements.submenu.addEventListener("mouseleave", hideSubmenu);

  requiredElements.mobileMenuButton.addEventListener("click", toggleMobileMenu);
  requiredElements.mobileMenuClose.addEventListener("click", toggleMobileMenu);
  requiredElements.mobileMenuBackdrop.addEventListener(
    "click",
    toggleMobileMenu
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideSubmenu();
      if (!requiredElements.mobileMenu.classList.contains("hidden")) {
        toggleMobileMenu();
      }
      document.activeElement?.blur();
    }
  });

  function handleResize() {
    if (window.innerWidth >= 1024) {
      requiredElements.topMenu.classList.remove("hidden");
      requiredElements.mobileMenu.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    } else {
      requiredElements.topMenu.classList.add("hidden");
      hideSubmenu();
    }
  }

  window.addEventListener("resize", handleResize);

  // Initial setup
  handleResize();
  setupMobileMenu();

  // Touch events for mobile
  let touchStartY;
  requiredElements.submenu.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  requiredElements.submenu.addEventListener(
    "touchmove",
    (e) => {
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (diff > 50) {
        hideSubmenu();
      }
    },
    { passive: true }
  );

  console.log("Navigation initialized successfully with Intersection Observer");
}

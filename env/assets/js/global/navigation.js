/**
 * @file navigation.js
 * @description Initializes and manages the navigation menu and submenu interactions
 */

/**
 * Initializes the navigation functionality
 */
export function initializeNavigation() {
  const requiredElements = {
    navWrapper: document.getElementById("nav-wrapper"),
    menuItems: document.querySelectorAll("#top-menu > li"),
    submenu: document.getElementById("submenu"),
    submenuContent: document.getElementById("submenu-content"),
    submenuGrid: document.getElementById("submenu-grid"),
    dashedBorder: document.getElementById("dashed-border"),
    mobileMenuButton: document.querySelector(
      "[aria-controls='top-menu'], .navbar-burger"
    ),
    topMenu: document.getElementById("top-menu"),
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
    const menuItem = event.currentTarget;
    if (
      event.type === "mouseenter" ||
      (event.type === "focus" && !menuItem.classList.contains("active"))
    ) {
      showSubmenu(menuItem);
    }
  }

  function toggleMobileMenu() {
    const isExpanded =
      requiredElements.mobileMenuButton.getAttribute("aria-expanded") ===
      "true";

    requiredElements.mobileMenuButton.setAttribute(
      "aria-expanded",
      (!isExpanded).toString()
    );
    requiredElements.topMenu.classList.toggle("hidden", isExpanded);
    requiredElements.topMenu.classList.toggle("lg:flex", isExpanded);
  }

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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideSubmenu();
      document.activeElement?.blur();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      requiredElements.topMenu?.classList.remove("hidden");
    } else {
      hideSubmenu();
      requiredElements.topMenu?.classList.add("hidden");
    }
  });

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

  console.log("Navigation initialized successfully");
}

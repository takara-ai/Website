export function initializeNavigation() {
  const navWrapper = document.getElementById("nav-wrapper");
  const menuItems = document.querySelectorAll("#top-menu > li");
  const submenu = document.getElementById("submenu");
  const submenuContent = document.getElementById("submenu-content");
  const submenuGrid = document.getElementById("submenu-grid");
  const dashedBorder = document.getElementById("dashed-border");
  let timeoutId;

  function showSubmenu(event) {
    clearTimeout(timeoutId);
    const section = event.currentTarget.dataset.section;
    const pages = event.currentTarget.querySelector("div").innerHTML;
    const sectionTitle = event.currentTarget.querySelector("a").textContent;

    submenuGrid.innerHTML = `
      <div class="col-start-4 col-span-1">
        <h3 class="text-sm text-gray-500 mb-2">Explore ${sectionTitle}</h3>
        <ul class="space-y-2">
          ${pages}
        </ul>
      </div>
    `;

    submenu.classList.remove("h-0");
    submenu.classList.add("h-auto");
    submenuContent.classList.remove("opacity-0");
    submenuContent.classList.add("opacity-100");

    const submenuHeight = submenu.offsetHeight;
    dashedBorder.style.transform = `translateY(${submenuHeight}px)`;

    // Update ARIA attributes
    event.currentTarget
      .querySelector("a")
      .setAttribute("aria-expanded", "true");
    submenu.setAttribute("aria-hidden", "false");
  }

  function hideSubmenu() {
    submenuContent.classList.remove("opacity-100");
    submenuContent.classList.add("opacity-0");
    timeoutId = setTimeout(() => {
      submenu.classList.remove("h-auto");
      submenu.classList.add("h-0");
      dashedBorder.style.transform = "translateY(0)";

      // Update ARIA attributes
      menuItems.forEach((item) => {
        item.querySelector("a").setAttribute("aria-expanded", "false");
      });
      submenu.setAttribute("aria-hidden", "true");
    }, 200);
  }

  function handleMenuItemInteraction(event) {
    if (
      event.type === "mouseenter" ||
      (event.type === "focus" &&
        !event.target.closest("li").classList.contains("active"))
    ) {
      showSubmenu(event);
    }
  }

  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", handleMenuItemInteraction);
    item.addEventListener("focus", handleMenuItemInteraction, true);
  });

  submenu.addEventListener("mouseenter", () => clearTimeout(timeoutId));

  navWrapper.addEventListener("mouseleave", hideSubmenu);
  submenu.addEventListener("mouseleave", hideSubmenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideSubmenu();
      document.activeElement.blur();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth < 1024) {
      // lg breakpoint
      hideSubmenu();
    }
  });

  let touchStartY;
  submenu.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  submenu.addEventListener(
    "touchmove",
    (e) => {
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (diff > 50) {
        // Swipe up
        hideSubmenu();
      }
    },
    { passive: true }
  );
}

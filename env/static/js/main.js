(()=>{function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t=globalThis,n={},r={},s=t.parcelRequireedc5;null==s&&((s=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var s={id:e,exports:{}};return n[e]=s,t.call(s.exports,s,s.exports),s.exports}var o=Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequireedc5=s);var o=s.register;o("kU33X",function(t,n){e(t.exports,"initializeNavigation",()=>r);function r(){let e,t;let n={navWrapper:document.getElementById("nav-wrapper"),menuItems:document.querySelectorAll("#top-menu > li"),submenu:document.getElementById("submenu"),submenuContent:document.getElementById("submenu-content"),submenuGrid:document.getElementById("submenu-grid"),dashedBorder:document.getElementById("dashed-border"),mobileMenuButton:document.querySelector("[aria-controls='top-menu'], .navbar-burger"),topMenu:document.getElementById("top-menu")},r=Object.entries(n).filter(([e,t])=>!t||t instanceof NodeList&&0===t.length).map(([e])=>e);if(r.length>0){console.error("Error initializing navigation: The following required elements were not found:",r);return}function s(){n.submenuContent.classList.remove("opacity-100"),n.submenuContent.classList.add("opacity-0"),e=setTimeout(()=>{n.submenu.classList.remove("h-auto"),n.submenu.classList.add("h-0"),n.dashedBorder.style.transform="translateY(0)",n.menuItems.forEach(e=>{e.querySelector("a")?.setAttribute("aria-expanded","false")}),n.submenu.setAttribute("aria-hidden","true")},200)}function o(t){let r=t.currentTarget;"mouseenter"!==t.type&&("focus"!==t.type||r.classList.contains("active"))||function(t){clearTimeout(e);let r=t.querySelector("[role='menu']")?.innerHTML||"",s=t.querySelector("a")?.textContent||"";n.submenuGrid.innerHTML=`
      <div class="col-start-4 col-span-1">
        <h3 class="text-sm text-neutral-600 mb-2">Explore ${s}</h3>
        <ul class="space-y-2 text-right">
          ${r}
        </ul>
      </div>
    `,n.submenu.classList.remove("h-0"),n.submenu.classList.add("h-auto"),n.submenuContent.classList.remove("opacity-0"),n.submenuContent.classList.add("opacity-100");let o=n.submenu.offsetHeight;n.dashedBorder.style.transform=`translateY(${o}px)`,t.querySelector("a")?.setAttribute("aria-expanded","true"),n.submenu.setAttribute("aria-hidden","false")}(r)}let i=new IntersectionObserver(e=>{e.forEach(e=>{let t=e.target.getAttribute("id"),n=document.querySelector(`#top-menu a[href="#${t}"]`)?.parentElement;e.isIntersecting?n?.classList.add("active"):n?.classList.remove("active")})},{root:null,rootMargin:"0px",threshold:.5});document.querySelectorAll("section[id]").forEach(e=>{i.observe(e)}),n.menuItems.forEach(e=>{e.addEventListener("mouseenter",o),e.addEventListener("focus",o,!0)}),n.submenu.addEventListener("mouseenter",()=>clearTimeout(e)),n.navWrapper.addEventListener("mouseleave",s),n.submenu.addEventListener("mouseleave",s),n.mobileMenuButton.addEventListener("click",function(){let e="true"===n.mobileMenuButton.getAttribute("aria-expanded");n.mobileMenuButton.setAttribute("aria-expanded",(!e).toString()),n.topMenu.classList.toggle("hidden",e),n.topMenu.classList.toggle("lg:flex",e)}),document.addEventListener("keydown",e=>{"Escape"===e.key&&(s(),document.activeElement?.blur())}),window.addEventListener("resize",()=>{window.innerWidth>=1024?n.topMenu?.classList.remove("hidden"):(s(),n.topMenu?.classList.add("hidden"))}),n.submenu.addEventListener("touchstart",e=>{t=e.touches[0].clientY},{passive:!0}),n.submenu.addEventListener("touchmove",e=>{let n=e.touches[0].clientY;t-n>50&&s()},{passive:!0}),console.log("Navigation initialized successfully with Intersection Observer")}}),o("6ylWG",function(t,n){e(t.exports,"displayTakaraCrane",()=>s);let r=`
 #                                                
   #                                              
    ##                               # #          
      ##                          ## ##           
       ###                    ########            
        ####               ###########            
          ####         # ###### #####             
           ######    ### ## # ######              
             ###### ##### #########     ## ##     
              ##   #### ## #####      #### ###    
              ########  #########  #####     ##   
            ################  #########        #  
           ################# # ######             
           ####### ########### ####               
          ###### ########## ## ##                 
         ##### #########                          
        #### #######                              
        ########                                  
       ######                                     
      # #                                         
`;function s(){console.info("%c"+r,"color: #B91C1C; font-family: monospace;","We're hiring! https://www.linkedin.com/company/takara-ai/jobs/")}});var i=s("kU33X"),a=s("6ylWG");document.addEventListener("DOMContentLoaded",()=>{(0,i.initializeNavigation)(),(0,a.displayTakaraCrane)()})})();
//# sourceMappingURL=main.js.map

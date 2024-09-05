!function(){let e="cookie_consent",t="NXXB8JJH";function n(e,t,n){try{let o=new Date;o.setTime(o.getTime()+864e5*n);let c=`expires=${o.toUTCString()}`;document.cookie=`${e}=${t};${c};path=/;SameSite=Lax`}catch(e){console.error("Error setting cookie:",e)}}function o(){let e=document.getElementById("cookie-consent-modal");e&&(e.classList.add("hidden"),document.body.style.overflow="")}function c(){n(e,"accepted",365),o(),r()}function d(){n(e,"rejected",365),o()}function r(){if(!window.gtmLoaded)try{let e=document.createElement("script");e.textContent=`
                (function(w,d,s,l,i){
                    var key = '${t}';
                    var prefix = atob('R1RNLg==');
                    w[l]=w[l]||[];
                    w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),
                        dl=l!='dataLayer'?'&l='+l:'';
                    j.async=true;
                    j.src='/js/global/takaralytics.js?id=' + prefix + key;
                    f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${t}');
            `,document.head.appendChild(e),window.gtmLoaded=!0}catch(e){console.error("Error loading GTM:",e)}}function i(){let t=function(e){try{let t=`${e}=`,n=document.cookie.split(";");for(let e=0;e<n.length;e++){let o=n[e];for(;" "===o.charAt(0);)o=o.substring(1,o.length);if(0===o.indexOf(t))return o.substring(t.length,o.length)}return null}catch(e){return console.error("Error getting cookie:",e),null}}(e);"accepted"===t?r():"rejected"!==t&&function(){let e=document.getElementById("cookie-consent-modal");e&&(e.classList.remove("hidden"),document.body.style.overflow="hidden")}();let n=document.getElementById("accept-cookies"),o=document.getElementById("reject-cookies");n&&n.addEventListener("click",c),o&&o.addEventListener("click",d)}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",i):i()}();
//# sourceMappingURL=modal.js.map

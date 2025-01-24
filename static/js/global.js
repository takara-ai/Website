(function(){const r="cookie_consent",i="NXXB8JJH";function d(e,t,c){try{const o=new Date;o.setTime(o.getTime()+c*24*60*60*1e3);const n=`expires=${o.toUTCString()}`;document.cookie=`${e}=${t};${n};path=/;SameSite=Lax`}catch(o){console.error("Error setting cookie:",o)}}function u(e){try{const t=`${e}=`,c=document.cookie.split(";");for(let o=0;o<c.length;o++){let n=c[o];for(;n.charAt(0)===" ";)n=n.substring(1,n.length);if(n.indexOf(t)===0)return n.substring(t.length,n.length)}return null}catch(t){return console.error("Error getting cookie:",t),null}}function m(){const e=document.getElementById("cookie-consent-modal");e&&(e.classList.remove("hidden"),document.body.style.overflow="hidden")}function s(){const e=document.getElementById("cookie-consent-modal");e&&(e.classList.add("hidden"),document.body.style.overflow="")}function f(){d(r,"accepted",365),s(),a()}function g(){d(r,"rejected",365),s()}function a(){if(!window.gtmLoaded)try{const e=document.createElement("script");e.textContent=`
                (function(w,d,s,l,i){
                    var key = '${i}';
                    var prefix = atob('R1RNLg==');
                    w[l]=w[l]||[];
                    w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),
                        dl=l!='dataLayer'?'&l='+l:'';
                    j.async=true;
                    j.src='/js/global/takaralytics.js?id=' + prefix + key;
                    f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${i}');
            `,document.head.appendChild(e),window.gtmLoaded=!0}catch(e){console.error("Error loading GTM:",e)}}function l(){const e=u(r);e==="accepted"?a():e!=="rejected"&&m();const t=document.getElementById("accept-cookies"),c=document.getElementById("reject-cookies");t&&t.addEventListener("click",f),c&&c.addEventListener("click",g)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",l):l()})();

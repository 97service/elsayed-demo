(()=>{
const WA="9613120434", WA_SHOW="03 120 434", IG="https://www.instagram.com/elsayed.boutique/";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const LS={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
let lang=LS.get("es_lang","en");
const ar=()=>lang==="ar";
const T=(en,a)=>ar()?a:en;
const bi=(en,a)=>`<span class="en">${en}</span><span class="ar">${a}</span>`;
const img=(id,w=900)=>`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
window.ESimg=img;
const fallback=`this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 3 4%22%3E%3Crect width=%223%22 height=%224%22 fill=%22%23e9e6e0%22/%3E%3C/svg%3E'`;
const P=window.P, CATS=window.CATS;
const now=p=>Math.round(p.p*(100-p.off)/100);
const total=p=>Object.values(p.st).reduce((a,b)=>a+b,0);
const money=n=>"$"+n.toLocaleString("en-US");
const catName=k=>{const c=CATS.find(c=>c.k===k);return c?T(c.en,c.ar):k};
const pname=p=>T(p.n,p.ar||p.n);
const q=new URLSearchParams(location.search);
const ico={
 search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
 heart:'<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/></svg>',
 bag:'<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
 user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>',
 menu:'<svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
 x:'<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19"/></svg>',
 ig:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/></svg>',
 fb:'<svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/></svg>',
 tt:'<svg viewBox="0 0 24 24"><path d="M14 3v11a3.5 3.5 0 1 1-3-3.5M14 3c.5 3 2.5 5 5.5 5"/></svg>',
 wa:'<svg viewBox="0 0 32 32"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.5 4.9c2 .9 2.8.9 3.9.8a3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5c-.1-.2-.3-.3-.7-.5z"/></svg>',
 truck:'<svg viewBox="0 0 24 24"><path d="M2 6h12v10H2zM14 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
 store:'<svg viewBox="0 0 24 24"><path d="M3 9l2-5h14l2 5M4 9v11h16V9M3 9h18M9 20v-6h6v6"/></svg>',
 swap:'<svg viewBox="0 0 24 24"><path d="M4 8h14l-4-4M20 16H6l4 4"/></svg>',
 cash:'<svg viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="1"/><circle cx="12" cy="12" r="3"/></svg>'
};
window.ESico=ico;

/* ---------- state ---------- */
let cart=LS.get("es_cart",[]), wish=LS.get("es_wish",[]);
const saveCart=()=>{LS.set("es_cart",cart);renderCounts();renderDrawer()};
const saveWish=()=>{LS.set("es_wish",wish);renderCounts()};
const cartCount=()=>cart.reduce((a,l)=>a+l.q,0);
const subtotal=()=>cart.reduce((a,l)=>{const p=P.find(x=>x.id===l.id);return a+(p?now(p)*l.q:0)},0);
function addToCart(id,c,s,qty=1){const p=P.find(x=>x.id===id);const max=p.st[s]||0;const ex=cart.find(l=>l.id===id&&l.c===c&&l.s===s);
 if(ex){ex.q=Math.min(max,ex.q+qty)}else cart.push({id,c,s,q:Math.min(max,qty)});saveCart();openDrawer()}
window.ESaddToCart=addToCart;

/* ---------- chrome ---------- */
function chrome(){
 const page=document.body.dataset.page||"";
 document.documentElement.lang=lang;document.documentElement.dir=ar()?"rtl":"ltr";
 const nav=[...CATS.map(c=>[`shop.html?cat=${c.k}`,bi(c.en,c.ar),""]),["shop.html?sale=1",bi("Sale","تنزيلات"),"sale"]];
 const hdr=`<div class="promo">${bi('<b>Black November</b> · up to 40% off everything · 25 to 29 November · Free delivery over $150','<b>بلاك نوفمبر</b> · خصم لغاية 40% على كل المحل · من 25 لـ 29 تشرين الثاني · توصيل مجاني فوق 150$')}</div>
 <header class="site"><div class="bar">
  <div class="left"><button class="icon menubtn" id="menuBtn" aria-label="Menu">${ico.menu}</button><button class="icon" id="searchBtn" aria-label="Search">${ico.search}</button><button class="lang hide-m" id="langBtn">${ar()?"English":"عربي"}</button></div>
  <a class="logo" href="index.html">EL SAYED<small>BOUTIQUE · TRIPOLI</small></a>
  <div class="right"><a class="icon hide-m" href="contact.html" aria-label="Contact">${ico.user}</a><a class="icon" href="wishlist.html" aria-label="Wishlist">${ico.heart}<span class="n" id="wishN" hidden></span></a><button class="icon" id="bagBtn" aria-label="Bag">${ico.bag}<span class="n" id="bagN" hidden></span></button></div>
 </div>
 <nav class="main"><a href="shop.html?new=1">${bi("New in","وصل حديثاً")}</a>${nav.map(([h,l,c])=>`<a href="${h}" class="${c}">${l}</a>`).join("")}<a href="about.html">${bi("The boutique","عن المحل")}</a></nav></header>
 <div class="mnav" id="mnav"><button class="icon" id="mClose" aria-label="Close">${ico.x}</button>
  <a href="shop.html?new=1">${bi("New in","وصل حديثاً")}</a>${nav.map(([h,l])=>`<a href="${h}">${l}</a>`).join("")}<a href="shop.html">${bi("Shop all","كل المنتجات")}</a><a href="about.html">${bi("The boutique","عن المحل")}</a><a href="contact.html">${bi("Contact & store","تواصل وعنوان المحل")}</a><a href="shipping.html">${bi("Delivery & returns","التوصيل والتبديل")}</a>
  <button class="btn ghost mt" id="langBtn2">${ar()?"English":"عربي"}</button></div>
 <div class="search" id="search"><form action="shop.html"><input name="q" placeholder="${T("Search jackets, BOSS, sneakers…","دوّر على جاكيت، BOSS، سنيكرز…")}" aria-label="Search"><button class="icon" type="button" id="sClose" aria-label="Close">${ico.x}</button></form>
  <div class="hint">${T("Popular:","الأكثر بحثاً:")} <a href="shop.html?q=leather">Leather</a><a href="shop.html?brand=BOSS">BOSS</a><a href="shop.html?cat=knitwear">${catName("knitwear")}</a><a href="shop.html?cat=footwear">${catName("footwear")}</a></div></div>
 <div class="scrim" id="scrim"></div>
 <aside class="drawer" id="drawer" aria-label="Bag"><header><h3 style="font-size:24px">${T("Your bag","السلة")}</h3><button class="icon" id="dClose" aria-label="Close">${ico.x}</button></header><div class="lines" id="dLines"></div><div class="sum" id="dSum"></div></aside>
 <a class="fab" href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${ico.wa}</a>
 <div class="toast" id="toast"></div>`;
 $("#hdr").innerHTML=hdr;
 $$("nav.main a").forEach(a=>{if(location.href.endsWith(a.getAttribute("href")))a.classList.add("on")});
 const ftr=`<section class="band news"><div class="wrap"><span class="eyebrow" style="color:#aaa">${T("El Sayed Club","نادي السيد")}</span><h2 class="sec" style="margin-top:10px">${T("First to know, first to shop","أوّل من يعرف، وأوّل من يشتري")}</h2><p style="color:#bbb;margin:12px 0 0">${T("New arrivals, private sales and 10% off your first order.","وصول القطع الجديدة، تنزيلات خاصة، و10% خصم على أوّل طلب.")}</p>
  <form id="newsForm"><input type="email" required placeholder="${T("Your email","إيميلك")}" aria-label="Email"><button>${T("Join","اشترك")}</button></form><div class="ok" id="newsOk"></div></div></section>
 <footer class="site band"><div class="wrap"><div class="cols">
  <div><a class="logo" href="index.html" style="font-size:28px">EL SAYED</a><p style="max-width:320px">${T("Menswear boutique in Tripoli since day one. BOSS, Karl Lagerfeld, Gran Sasso, Harmont & Blaine and Eden Park. Elegance, quality and style.","بوتيك رجالي بطرابلس. BOSS، Karl Lagerfeld، Gran Sasso، Harmont & Blaine و Eden Park. أناقة، جودة وستايل.")}</p>
   <div class="social"><a href="${IG}" target="_blank" rel="noopener" aria-label="Instagram">${ico.ig}</a><a href="#" aria-label="Facebook">${ico.fb}</a><a href="#" aria-label="TikTok">${ico.tt}</a><a href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="WhatsApp" style="padding:8px">${ico.wa.replace('<svg','<svg style="fill:#fff;stroke:none"')}</a></div></div>
  <div><h4>${T("Shop","تسوّق")}</h4><a href="shop.html?new=1">${T("New in","وصل حديثاً")}</a>${CATS.map(c=>`<a href="shop.html?cat=${c.k}">${T(c.en,c.ar)}</a>`).join("")}<a href="shop.html?sale=1">${T("Sale","تنزيلات")}</a></div>
  <div><h4>${T("Help","مساعدة")}</h4><a href="shipping.html">${T("Delivery","التوصيل")}</a><a href="shipping.html#returns">${T("Returns & exchanges","التبديل والإرجاع")}</a><a href="shipping.html#sizes">${T("Size guide","دليل المقاسات")}</a><a href="shipping.html#faq">${T("FAQ","أسئلة متكررة")}</a><a href="contact.html">${T("Contact us","تواصل معنا")}</a></div>
  <div><h4>${T("The boutique","المحل")}</h4><a href="about.html">${T("Our story","قصتنا")}</a><a href="contact.html#visit">Kadisha St, Spring Bldg<br>${T("Tripoli, Lebanon","طرابلس، لبنان")}</a><a href="https://wa.me/${WA}" target="_blank" rel="noopener">WhatsApp ${WA_SHOW}</a><a href="${IG}" target="_blank" rel="noopener">@elsayed.boutique</a></div>
 </div><div class="legal"><span>© 2026 El Sayed Boutique · <a href="terms.html" style="display:inline">${T("Terms & privacy","الشروط والخصوصية")}</a></span><div class="pays"><span>${T("Cash on delivery","الدفع عند الاستلام")}</span><span>Whish Money</span><span>OMT</span><span>Visa / Mastercard</span></div></div></div></footer>`;
 $("#ftr").innerHTML=ftr;
 // events
 const scrim=$("#scrim");
 const closeAll=()=>{$("#mnav").classList.remove("open");$("#drawer").classList.remove("open");$("#search").classList.remove("open");scrim.classList.remove("on")};
 window.EScloseAll=closeAll;
 $("#menuBtn").onclick=()=>{$("#mnav").classList.add("open");scrim.classList.add("on")};
 $("#mClose").onclick=closeAll;scrim.onclick=closeAll;
 $("#searchBtn").onclick=()=>{$("#search").classList.add("open");scrim.classList.add("on");setTimeout(()=>$("#search input").focus(),200)};
 $("#sClose").onclick=closeAll;
 $("#bagBtn").onclick=openDrawer;$("#dClose").onclick=closeAll;
 const flip=()=>{LS.set("es_lang",ar()?"en":"ar");location.reload()};
 $("#langBtn").onclick=flip;$("#langBtn2").onclick=flip;
 $("#newsForm").onsubmit=e=>{e.preventDefault();$("#newsOk").textContent=T("Welcome to the club. Your 10% code: WELCOME10","أهلا فيك بالنادي. كود الخصم 10%: WELCOME10");e.target.reset()};
 document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeAll();$$(".modal").forEach(m=>m.classList.remove("on"))}});
 document.addEventListener("click",e=>{const h=e.target.closest(".heart");if(h){e.preventDefault();toggleWish(+h.dataset.id);h.classList.toggle("on",wish.includes(+h.dataset.id))}});
 const hh=()=>document.documentElement.style.setProperty("--hh",$("header.site").offsetHeight+"px");hh();addEventListener("resize",hh);
 renderCounts();renderDrawer();
}
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("on"),2400)}
window.EStoast=toast;
function toggleWish(id){wish=wish.includes(id)?wish.filter(x=>x!==id):[...wish,id];saveWish();toast(wish.includes(id)?T("Saved to your wishlist","انحفظت بالمفضّلة"):T("Removed from wishlist","انشالت من المفضّلة"))}
function renderCounts(){const b=$("#bagN"),w=$("#wishN");if(!b)return;const n=cartCount();b.hidden=!n;b.textContent=n;w.hidden=!wish.length;w.textContent=wish.length}
function openDrawer(){renderDrawer();$("#drawer").classList.add("open");$("#scrim").classList.add("on")}
function lineHTML(l,i){const p=P.find(x=>x.id===l.id);if(!p)return"";return`<div class="line"><a href="product.html?id=${p.id}"><img src="${img(p.img[0],200)}" alt="" onerror="${fallback}"></a><div><div class="eyebrow" style="font-size:11px">${p.b}</div><div>${pname(p)}</div><div class="meta">${p.col[l.c][0]} · ${T("Size","مقاس")} ${l.s}</div>
 <div class="qty"><button data-dq="${i}" aria-label="-">−</button><span>${l.q}</span><button data-iq="${i}" aria-label="+">+</button></div></div><div style="text-align:end"><div>${money(now(p)*l.q)}</div><button class="rm" data-rm="${i}">${T("Remove","شيل")}</button></div></div>`}
function bindLines(root){root.onclick=e=>{const t=e.target.closest("button");if(!t)return;const d=t.dataset;
 if(d.iq!=null){const l=cart[+d.iq],p=P.find(x=>x.id===l.id);if(l.q<p.st[l.s])l.q++;else toast(T("That's all we have in this size","هيدا كل اللي عنا بهالمقاس"))}
 else if(d.dq!=null){const i=+d.dq;cart[i].q--;if(!cart[i].q)cart.splice(i,1)}
 else if(d.rm!=null)cart.splice(+d.rm,1);else return;saveCart();if(window.ESonCart)window.ESonCart()}}
function renderDrawer(){const L=$("#dLines");if(!L)return;
 L.innerHTML=cart.length?cart.map(lineHTML).join(""):`<div class="empty">${T("Your bag is empty.","السلة فاضية.")}<br><a class="btn dark mt" href="shop.html">${T("Start shopping","ابدأ التسوّق")}</a></div>`;
 bindLines(L);const s=subtotal();
 $("#dSum").innerHTML=cart.length?`<div class="row"><span>${T("Subtotal","المجموع")}</span><b>${money(s)}</b></div><div class="row muted" style="font-size:14px"><span>${T("Delivery","التوصيل")}</span><span>${s>=150?T("Free","مجاني"):money(5)}</span></div>
 <a class="btn dark" href="checkout.html">${T("Checkout","إتمام الطلب")}</a><a class="btn ghost" href="cart.html">${T("View bag","عرض السلة")}</a>`:"";}

/* ---------- cards ---------- */
function card(p){const t=total(p);const lo=t>0&&t<=3;return`<a class="card" href="product.html?id=${p.id}">
 <div class="ph">${p.off?`<span class="tag">−${p.off}%</span>`:""}${p.isNew&&!p.off?`<span class="tag new">${T("New","جديد")}</span>`:""}
 <button class="heart ${wish.includes(p.id)?"on":""}" data-id="${p.id}" aria-label="Wishlist">${ico.heart}</button>
 <img src="${img(p.img[0],700)}" alt="${p.b} ${p.n}" loading="lazy" onerror="${fallback}">${p.img[1]?`<img class="alt" src="${img(p.img[1],700)}" alt="" loading="lazy" onerror="this.remove()">`:""}</div>
 <div class="brand">${p.b}</div><div class="name">${pname(p)}</div>
 <div class="price">${p.off?`<span class="now sale">${money(now(p))}</span><s>${money(p.p)}</s>`:`<span class="now">${money(p.p)}</span>`}</div>
 <div class="swatches">${p.col.map(c=>`<i style="background:${c[1]}" title="${c[0]}"></i>`).join("")}</div>
 ${t===0?`<span class="low">${T("Sold out","نفد")}</span>`:lo?`<span class="low">${T("Only "+t+" left","باقي "+t+" بس")}</span>`:""}</a>`}
window.EScard=card;

/* ---------- pages ---------- */
const pages={
home(){
 $("#rail").innerHTML=P.filter(p=>p.isNew).concat(P.filter(p=>!p.isNew).slice(0,6)).map(card).join("");
 $("#best").innerHTML=[8,1,16,12,9,2,21,13].map(i=>card(P.find(p=>p.id===i))).join("");
 $("#cats").innerHTML=CATS.map(c=>`<a href="shop.html?cat=${c.k}"><div class="ph"><img src="${img(c.img,400)}" alt="" loading="lazy" onerror="${fallback}"></div>${T(c.en,c.ar)}</a>`).join("");
 $("#brands").innerHTML=window.BRANDS.map(b=>`<a href="shop.html?brand=${encodeURIComponent(b)}">${b}</a>`).join("");
 const r=$("#rail");$("#prev").onclick=()=>r.scrollBy({left:(ar()?1:-1)*r.clientWidth*.8,behavior:"smooth"});$("#next").onclick=()=>r.scrollBy({left:(ar()?-1:1)*r.clientWidth*.8,behavior:"smooth"});
},
shop(){
 const cat=q.get("cat"),brand=q.get("brand"),sale=q.get("sale"),isNew=q.get("new"),term=(q.get("q")||"").toLowerCase();
 const C=CATS.find(c=>c.k===cat);
 let title=C?T(C.en,C.ar):brand?brand:sale?T("Sale","تنزيلات"):isNew?T("New in","وصل حديثاً"):term?T(`Results for "${term}"`,`نتائج "${term}"`):T("Shop all","كل المنتجات");
 document.title=title+" · El Sayed Boutique";
 const banner=C?C.img:sale?"1681890443178-360c3a9cc4da":isNew?"1697811599461-38124b3decc9":"1600091106710-7be582d40984";
 $("#banner").innerHTML=`<img src="${img(banner,1800)}" alt="" onerror="${fallback}"><div class="copy"><div class="crumbs" style="color:#ddd"><a href="index.html">${T("Home","الرئيسية")}</a>/<span>${title}</span></div><h1>${title}</h1></div>`;
 const chips=[["",T("All","الكل")],...CATS.map(c=>[c.k,T(c.en,c.ar)])];
 $("#chips").innerHTML=chips.map(([k,l])=>`<a class="chip ${(cat||"")===k&&!brand&&!sale&&!isNew&&!term?"on":""}" href="shop.html${k?"?cat="+k:""}">${l}</a>`).join("");
 const bsel=$("#fBrand"),ssel=$("#fSize");
 bsel.innerHTML=`<option value="">${T("All brands","كل الماركات")}</option>`+window.BRANDS.map(b=>`<option ${b===brand?"selected":""}>${b}</option>`).join("");
 const sizes=[...new Set(P.flatMap(p=>Object.keys(p.st)))];
 ssel.innerHTML=`<option value="">${T("Any size","كل المقاسات")}</option>`+sizes.map(s=>`<option>${s}</option>`).join("");
 const draw=()=>{let L=P.filter(p=>(!cat||p.c===cat)&&(!sale||p.off)&&(!isNew||p.isNew)&&(!term||(p.n+" "+p.b+" "+p.c+" "+(p.ar||"")).toLowerCase().includes(term)));
  const b=bsel.value,s=ssel.value,inS=$("#fStock").checked;
  if(b)L=L.filter(p=>p.b===b);if(s)L=L.filter(p=>p.st[s]>0);if(inS)L=L.filter(p=>total(p)>0);
  const so=$("#sort").value;if(so==="low")L.sort((a,b)=>now(a)-now(b));if(so==="high")L.sort((a,b)=>now(b)-now(a));if(so==="off")L.sort((a,b)=>b.off-a.off);if(so==="new")L.sort((a,b)=>(b.isNew?1:0)-(a.isNew?1:0));
  $("#count").textContent=T(L.length+" pieces",L.length+" قطعة");
  $("#grid").innerHTML=L.length?L.map(card).join(""):`<div class="empty" style="grid-column:1/-1">${T("Nothing matches these filters yet.","ما في شي بيطابق هالفلاتر.")} <a href="shop.html">${T("See everything","شوف كل شي")}</a></div>`};
 [bsel,ssel,$("#sort"),$("#fStock")].forEach(e=>e.onchange=draw);draw();
},
product(){
 const p=P.find(x=>x.id===+q.get("id"))||P[0];document.title=p.b+" "+p.n+" · El Sayed Boutique";
 let c=0,s=null,qty=1;
 const gal=[...p.img];const extra=CATS.find(x=>x.k===p.c).img;if(gal.length<2&&extra!==gal[0])gal.push(extra);
 $("#crumbs").innerHTML=`<a href="index.html">${T("Home","الرئيسية")}</a>/<a href="shop.html?cat=${p.c}">${catName(p.c)}</a>/<span>${p.b}</span>`;
 $("#gallery").innerHTML=gal.map((g,i)=>`<img src="${img(g,1200)}" alt="${p.b} ${p.n}${i?" view "+(i+1):""}" data-z="${g}" onerror="${fallback}">`).join("");
 $("#gallery").onclick=e=>{const g=e.target.dataset.z;if(!g)return;$("#zoomImg").src=img(g,1800);$("#zoom").classList.add("on")};
 const draw=()=>{const left=s?p.st[s]:null;const sizes=Object.keys(p.st);
  $("#info").innerHTML=`<div class="eyebrow">${p.b}</div><h1>${pname(p)}</h1>
  <div class="price">${p.off?`<span class="now sale">${money(now(p))}</span><s>${money(p.p)}</s><span class="tag" style="position:static">−${p.off}%</span>`:`<span class="now">${money(p.p)}</span>`}</div>
  <p class="muted" style="margin:0;font-size:14px">${T("Prices in USD, VAT included.","الأسعار بالدولار وشاملة الضريبة.")}</p>
  <div class="opt"><div class="optlabel"><span>${T("Colour","اللون")}: ${p.col[c][0]}</span></div><div class="colors">${p.col.map((x,i)=>`<button class="${i===c?"on":""}" data-c="${i}" style="background:${x[1]}" aria-label="${x[0]}"></button>`).join("")}</div></div>
  <div class="opt"><div class="optlabel"><span>${T("Size","المقاس")}${s?": "+s:""}</span><button class="link" id="sg" style="font-size:13px;text-transform:none;letter-spacing:0">${T("Size guide","دليل المقاسات")}</button></div>
   <div class="sizes">${sizes.map(z=>`<button data-s="${z}" class="${z===s?"on":""}" ${p.st[z]?"":"disabled"}>${z}</button>`).join("")}</div></div>
  <div class="stock ${left!=null&&left<=2?"lo":""}">${s?(left<=2?T(`Only ${left} left in ${s}, order soon`,`باقي ${left} بس بمقاس ${s}`):T(`In stock in ${s}, ready to ship`,`متوفّر بمقاس ${s} وجاهز للتوصيل`)):T("Select a size to see availability","اختار المقاس لتشوف التوفّر")}</div>
  <div style="display:flex;gap:10px;align-items:center"><div class="qty" style="margin:0"><button id="qm">−</button><span>${qty}</span><button id="qp">+</button></div>
  <button class="btn dark" style="flex:1" id="add" ${s?"":"disabled"}>${s?T("Add to bag","زيد عالسلة"):T("Select a size","اختار المقاس")}</button>
  <button class="icon heart ${wish.includes(p.id)?"on":""}" data-id="${p.id}" style="position:static;border:1px solid var(--line);border-radius:0;width:50px;height:50px;background:none" aria-label="Wishlist">${ico.heart}</button></div>
  <a class="btn wa" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent(`Hello El Sayed, I'm interested in: ${p.b} ${p.n} (${p.col[c][0]}${s?", size "+s:""}) – ${money(now(p))}\n${location.href}`)}">${ico.wa.replace('<svg','<svg style="width:20px;height:20px;fill:#fff"')} ${T("Order or ask on WhatsApp","اطلب أو اسأل عالواتساب")}</a>
  <div class="trust"><span>${ico.truck.replace('<svg','<svg style="width:18px;height:18px;fill:none;stroke:currentColor;vertical-align:-4px"')} ${T("Delivery all over Lebanon, 1 to 3 days","توصيل لكل لبنان خلال 1 لـ 3 أيام")}</span><span>${ico.swap.replace('<svg','<svg style="width:18px;height:18px;fill:none;stroke:currentColor;vertical-align:-4px"')} ${T("Exchange within 7 days","تبديل خلال 7 أيام")}</span><span>${ico.store.replace('<svg','<svg style="width:18px;height:18px;fill:none;stroke:currentColor;vertical-align:-4px"')} ${T("Free pickup in Tripoli","استلام مجاني من المحل")}</span><span>${ico.cash.replace('<svg','<svg style="width:18px;height:18px;fill:none;stroke:currentColor;vertical-align:-4px"')} ${T("Cash on delivery","الدفع عند الاستلام")}</span></div>
  <div class="acc"><details open><summary>${T("Description","الوصف")}</summary><p>${p.d}</p></details>
  <details><summary>${T("Details & care","التفاصيل والعناية")}</summary><ul>${p.det.map(d=>`<li>${d}</li>`).join("")}</ul></details>
  <details><summary>${T("Delivery & returns","التوصيل والتبديل")}</summary><p>${T("Delivery across Lebanon in 1 to 3 working days, $5, free over $150. Free pickup from the boutique in Tripoli. Exchange or return within 7 days, unworn with tags attached.","توصيل لكل لبنان خلال 1 لـ 3 أيام عمل بـ 5$، ومجاني فوق 150$. استلام مجاني من المحل بطرابلس. تبديل أو إرجاع خلال 7 أيام إذا القطعة ما انلبست ومعها التيكيت.")} <a href="shipping.html">${T("More","المزيد")}</a></p></details></div>`;
 };
 draw();
 $("#info").onclick=e=>{const t=e.target.closest("button");if(!t)return;
  if(t.dataset.c){c=+t.dataset.c;draw()}else if(t.dataset.s){s=t.dataset.s;qty=1;draw()}
  else if(t.id==="qm"){qty=Math.max(1,qty-1);draw()}else if(t.id==="qp"){qty=Math.min(s?p.st[s]:5,qty+1);draw()}
  else if(t.id==="add"&&s){addToCart(p.id,c,s,qty)}else if(t.id==="sg"){$("#sizeModal").classList.add("on")}};
 const rel=P.filter(x=>x.id!==p.id&&(x.c===p.c||x.b===p.b)).slice(0,8);$("#related").innerHTML=rel.map(card).join("");
 // recently viewed
 let rv=LS.get("es_rv",[]).filter(x=>x!==p.id);rv.unshift(p.id);LS.set("es_rv",rv.slice(0,9));
 const rvp=rv.slice(1,9).map(i=>P.find(x=>x.id===i)).filter(Boolean);if(rvp.length){$("#rvWrap").hidden=false;$("#rv").innerHTML=rvp.map(card).join("")}
},
cart(){
 const draw=()=>{const L=$("#cLines");
  if(!cart.length){$("#cartWrap").innerHTML=`<div class="empty"><h2 class="sec">${T("Your bag is empty","السلة فاضية")}</h2><p>${T("Find something you love.","لاقي شي بيعجبك.")}</p><a class="btn dark" href="shop.html">${T("Shop the collection","تسوّق المجموعة")}</a></div>`;return}
  L.innerHTML=cart.map(lineHTML).join("");bindLines(L);summary($("#cSum"),true)};
 window.ESonCart=draw;draw();
},
checkout(){
 if(!cart.length){location.href="cart.html";return}
 summary($("#coSum"),false);
 const f=$("#coForm");
 f.addEventListener("change",()=>{const pick=f.ship.value==="pickup";$("#addrBox").hidden=pick;$$("#addrBox input,#addrBox select").forEach(i=>i.required=!pick);summary($("#coSum"),false)});
 f.onsubmit=e=>{e.preventDefault();
  const d=Object.fromEntries(new FormData(f));const tot=totals(d.ship);
  const no="ES-"+String(Date.now()).slice(-6);
  const items=cart.map(l=>{const p=P.find(x=>x.id===l.id);return `• ${p.b} ${p.n} (${p.col[l.c][0]}, ${l.s}) x${l.q} = ${money(now(p)*l.q)}`}).join("\n");
  const msg=`New order ${no}\n${items}\nSubtotal: ${money(tot.sub)}${tot.disc?`\nDiscount: -${money(tot.disc)}`:""}\nDelivery: ${tot.del?money(tot.del):"Free"}\nTotal: ${money(tot.total)}\n\nName: ${d.name}\nPhone: ${d.phone}\n${d.ship==="pickup"?"Pickup from the boutique":"Deliver to: "+d.city+", "+d.address}\nPayment: ${d.pay}${d.note?"\nNote: "+d.note:""}`;
  LS.set("es_last",{no,msg,total:tot.total,name:d.name});cart=[];LS.set("es_promo","");saveCart();location.href="thanks.html"};
},
thanks(){const o=LS.get("es_last",null);if(!o){location.href="index.html";return}
 $("#tNo").textContent=o.no;$("#tName").textContent=o.name.split(" ")[0];
 $("#tWa").href=`https://wa.me/${WA}?text=${encodeURIComponent(o.msg)}`;$("#tMsg").textContent=o.msg},
wishlist(){const draw=()=>{const L=wish.map(i=>P.find(p=>p.id===i)).filter(Boolean);
 $("#grid").innerHTML=L.length?L.map(card).join(""):`<div class="empty" style="grid-column:1/-1">${T("No saved pieces yet. Tap the heart on any product to save it.","ما في شي محفوظ. كبوس عالقلب بأي منتج لتحفظه.")}<br><a class="btn dark mt" href="shop.html">${T("Shop now","تسوّق هلّق")}</a></div>`};
 draw();document.addEventListener("click",e=>{if(e.target.closest(".heart"))setTimeout(draw,0)})}
};
function totals(ship){const sub=subtotal();const code=LS.get("es_promo","");const disc=code==="WELCOME10"?Math.round(sub*.1):0;const del=ship==="pickup"||sub-disc>=150?0:5;return{sub,disc,del,total:sub-disc+del,code}}
function summary(el,withBtn){const f=$("#coForm");const ship=f?f.ship.value:"delivery";const t=totals(ship);
 el.innerHTML=`<h3 style="font-size:24px">${T("Order summary","ملخّص الطلب")}</h3>
 ${withBtn?"":cart.map(l=>{const p=P.find(x=>x.id===l.id);return`<div class="row" style="font-size:14px"><span>${l.q} × ${p.b} ${pname(p)} <span class="muted">(${l.s})</span></span><span>${money(now(p)*l.q)}</span></div>`}).join("")}
 <div class="row"><span>${T("Subtotal","المجموع")}</span><span>${money(t.sub)}</span></div>
 ${t.disc?`<div class="row" style="color:var(--sale)"><span>${T("Discount","خصم")} (${t.code})</span><span>−${money(t.disc)}</span></div>`:""}
 <div class="row"><span>${T("Delivery","التوصيل")}</span><span>${t.del?money(t.del):T("Free","مجاني")}</span></div>
 <div class="row total"><b>${T("Total","المجموع الكلّي")}</b><b>${money(t.total)}</b></div>
 <form class="promo-in" id="pf"><input placeholder="${T("Promo code","كود خصم")}" value="${t.code||""}" aria-label="Promo code"><button class="btn ghost" style="min-height:44px;padding:0 16px">${T("Apply","طبّق")}</button></form><div class="err" id="pe"></div>
 ${withBtn?`<a class="btn dark" href="checkout.html">${T("Checkout","إتمام الطلب")}</a><a class="btn wa" target="_blank" rel="noopener" href="https://wa.me/${WA}">${T("Questions? WhatsApp us","عندك سؤال؟ راسلنا")}</a>`:""}
 <p class="muted" style="font-size:13px;margin:0">${T("Free delivery over $150 · Exchange within 7 days","توصيل مجاني فوق 150$ · تبديل خلال 7 أيام")}</p>`;
 $("#pf").onsubmit=e=>{e.preventDefault();const v=e.target[0].value.trim().toUpperCase();if(!v||v==="WELCOME10"){LS.set("es_promo",v);summary(el,withBtn)}else $("#pe").textContent=T("This code isn't valid.","هالكود مش صالح.")}}

chrome();
const pg=document.body.dataset.page;if(pages[pg])pages[pg]();
// size modal (any page that has it)
$$("[data-close]").forEach(b=>b.onclick=()=>b.closest(".modal").classList.remove("on"));
$$(".modal").forEach(m=>m.onclick=e=>{if(e.target===m)m.classList.remove("on")});
})();

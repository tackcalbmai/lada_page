(()=>{'use strict';
const d=document,b=d.body;
const BRAND='AVAZZOR TATTOO',ARTIST='LADA ROMANOVA';
const getLang=()=>window.LADA_I18N?.getLanguage?.()||localStorage.getItem('lada-lang')||'ru';

function setBrand(){
 d.querySelectorAll('.site-header .brand b,.footer .brand b').forEach(el=>el.textContent=BRAND);
 d.querySelectorAll('.site-header .brand span').forEach(el=>el.textContent='/ '+ARTIST);
 d.querySelectorAll('.footer .brand span').forEach(el=>el.textContent='/ '+ARTIST+' · RIGA');
 d.querySelectorAll('.breadcrumb').forEach(el=>{
   const first=[...el.childNodes].find(n=>n.nodeType===Node.TEXT_NODE&&/LADA|AVAZZOR/i.test(n.nodeValue));
   if(first)first.nodeValue=first.nodeValue.replace(/(?:LADA(?: ROMANOVA)?|AVAZZOR TATTOO)/i,BRAND);
 });
 if(!d.title.includes(BRAND))d.title=BRAND+' — '+d.title.replace(/^LADA\s*/i,'').trim();
}

function normalizeFineLine(root=d.body){
 const walker=d.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{
   const p=n.parentElement;
   return !p||p.closest('script,style')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;
 }});
 let n;
 while(walker.nextNode()){
   n=walker.currentNode;
   n.nodeValue=n.nodeValue.replace(/\bfineline\b/gi,'Fine line').replace(/\bfine linework\b/gi,'Fine line');
 }
 d.querySelectorAll('meta[content]').forEach(m=>m.content=m.content.replace(/\bfineline\b/gi,'Fine line').replace(/\bfine linework\b/gi,'Fine line'));
 d.title=d.title.replace(/\bfineline\b/gi,'Fine line').replace(/\bfine linework\b/gi,'Fine line');
}

const FAQ={
'Вопросы.':{lv:'Jautājumi.',en:'Questions.'},
'Короткие ответы на основные вопросы о записи, эскизе, стоимости, депозите и подготовке к сеансу.':{lv:'Īsas atbildes uz galvenajiem jautājumiem par pierakstu, dizainu, cenu, depozītu un sagatavošanos seansam.',en:'Short answers to the main questions about booking, design, price, deposit and preparing for the session.'},
'Как записаться?':{lv:'Kā pieteikties?',en:'How do I book?'},
'Написать можно в Instagram Direct или WhatsApp на русском или английском языке. Для первого сообщения укажи идею или выбранный авторский эскиз, место на теле, примерный размер, желаемые даты и свой город, если приезжаешь в Ригу.':{lv:'Rakstīt var Instagram Direct vai WhatsApp krievu vai angļu valodā. Pirmajā ziņā norādi ideju vai izvēlēto oriģinālo dizainu, vietu uz ķermeņa, aptuveno izmēru, vēlamo datumu un savu pilsētu, ja brauc uz Rīgu.',en:'Message via Instagram Direct or WhatsApp in Russian or English. In your first message, include the idea or selected original design, body placement, approximate size, preferred date and your city if you are travelling to Riga.'},
'Что происходит после первого сообщения?':{lv:'Kas notiek pēc pirmās ziņas?',en:'What happens after the first message?'},
'После получения основной информации уточняются детали проекта. Затем ты получаешь ориентировочную стоимость, доступные даты и дальнейший порядок записи.':{lv:'Pēc pamatinformācijas saņemšanas tiek precizētas projekta detaļas. Pēc tam saņemsi aptuveno cenu, pieejamos datumus un turpmāko pieraksta kārtību.',en:'After the basic information is received, the project details are clarified. You then receive an approximate price, available dates and the next booking steps.'},
'Можно ли принести готовую картинку из интернета?':{lv:'Vai var izmantot attēlu no interneta?',en:'Can I bring an image from the internet?'},
'Референсы можно использовать, чтобы показать настроение, детали и направление. Финальный эскиз создаётся как самостоятельная работа и адаптируется под конкретное место на теле, а не копируется один в один.':{lv:'Atsauces var izmantot, lai parādītu noskaņu, detaļas un virzienu. Gala dizains tiek radīts kā patstāvīgs darbs un pielāgots konkrētai ķermeņa vietai, nevis kopēts viens pret vienu.',en:'References can show the mood, details and direction. The final design is created as an original piece adapted to the specific body placement rather than copied one-to-one.'},
'Нужен ли депозит?':{lv:'Vai nepieciešams depozīts?',en:'Is a deposit required?'},
'Да. Для бронирования согласованной даты требуется депозит. Его размер и условия сообщаются до оплаты.':{lv:'Jā. Lai rezervētu saskaņoto datumu, nepieciešams depozīts. Tā apmērs un nosacījumi tiek paziņoti pirms apmaksas.',en:'Yes. A deposit is required to reserve the agreed date. The amount and terms are provided before payment.'},
'Можно ли перекрыть старую татуировку?':{lv:'Vai var pārklāt vecu tetovējumu?',en:'Can an old tattoo be covered?'},
'Да, но сначала нужна оценка исходной работы. Для cover-up лучше сразу отправить чёткую фотографию старой татуировки при хорошем освещении.':{lv:'Jā, taču vispirms jāizvērtē esošais darbs. Cover-up gadījumā uzreiz nosūti skaidru vecā tetovējuma fotogrāfiju labā apgaismojumā.',en:'Yes, but the existing tattoo must be assessed first. For a cover-up, send a clear photo of the old tattoo in good lighting.'},
'Сколько стоит татуировка?':{lv:'Cik maksā tetovējums?',en:'How much does a tattoo cost?'},
'Стоимость зависит от размера, расположения, сложности композиции и объёма работы. Ориентировочная цена определяется после того, как понятны идея и основные параметры проекта.':{lv:'Cena ir atkarīga no izmēra, novietojuma, kompozīcijas sarežģītības un darba apjoma. Aptuvenā cena tiek noteikta, kad ir skaidra ideja un projekta pamatparametri.',en:'Price depends on size, placement, composition complexity and amount of work. An approximate price is provided once the idea and main project parameters are clear.'},
'Как подготовиться к сеансу?':{lv:'Kā sagatavoties seansam?',en:'How should I prepare for the session?'},
'Перед сеансом важно выспаться, нормально поесть и не употреблять алкоголь. Все дополнительные рекомендации сообщаются заранее.':{lv:'Pirms seansa svarīgi izgulēties, normāli paēst un nelietot alkoholu. Papildu ieteikumi tiek nosūtīti iepriekš.',en:'Before the session, get enough sleep, eat properly and avoid alcohol. Any additional recommendations are provided in advance.'},
'Как ухаживать за татуировкой после сеанса?':{lv:'Kā kopt tetovējumu pēc seansa?',en:'How do I care for the tattoo after the session?'},
'После сеанса выдаются конкретные рекомендации по очищению, увлажнению и защите татуировки на период заживления.':{lv:'Pēc seansa saņemsi konkrētus ieteikumus tetovējuma tīrīšanai, mitrināšanai un aizsardzībai dzīšanas laikā.',en:'After the session you will receive specific instructions for cleaning, moisturising and protecting the tattoo while it heals.'},
'Остался вопрос?':{lv:'Palika jautājums?',en:'Still have a question?'},
'Если ответ зависит от конкретной идеи, проще сразу описать её и приложить референсы.':{lv:'Ja atbilde ir atkarīga no konkrētās idejas, vienkāršāk ir uzreiz to aprakstīt un pievienot atsauces.',en:'If the answer depends on your specific idea, it is easier to describe it and attach references right away.'},
'Перейти к записи':{lv:'Pāriet uz pierakstu',en:'Go to booking'},
'Before your session':{lv:'Pirms seansa',en:'Before your session'},
'Still have a question?':{lv:'Vēl ir jautājums?',en:'Still have a question?'}
};
const faqInverse=new Map();
Object.entries(FAQ).forEach(([ru,o])=>{faqInverse.set(ru,ru);faqInverse.set(o.lv,ru);faqInverse.set(o.en,ru)});

function applyFaq(lang){
 if(!/faq\.html$/.test(location.pathname))return;
 const walker=d.createTreeWalker(d.querySelector('main')||b,NodeFilter.SHOW_TEXT,{acceptNode:n=>{
   const p=n.parentElement;
   if(!p||p.closest('script,style,.lang-switch,.mobile-lang'))return NodeFilter.FILTER_REJECT;
   return n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
 }});
 const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 nodes.forEach(n=>{
   const raw=n.nodeValue,trim=raw.trim(),src=n.__avazzorFaqSource||faqInverse.get(trim);
   if(!src)return;
   n.__avazzorFaqSource=src;
   const val=lang==='ru'?src:(FAQ[src]?.[lang]||src);
   const pre=raw.match(/^\s*/)?.[0]||'',post=raw.match(/\s*$/)?.[0]||'';
   n.nodeValue=pre+val+post;
 });
 const desc=d.querySelector('meta[name="description"]');
 if(lang==='lv'){d.title='FAQ — AVAZZOR TATTOO Rīga';if(desc)desc.content='Atbildes par pierakstu AVAZZOR TATTOO: dizains, cena, depozīts, sagatavošanās, cover-up un kopšana.'}
 if(lang==='en'){d.title='FAQ — AVAZZOR TATTOO Riga';if(desc)desc.content='Answers about booking at AVAZZOR TATTOO: design, price, deposit, preparation, cover-up and aftercare.'}
 if(lang==='ru'){d.title='FAQ — AVAZZOR TATTOO Riga';if(desc)desc.content='Ответы на вопросы о записи в AVAZZOR TATTOO: эскиз, стоимость, депозит, подготовка, cover-up и уход.'}
}

function ensureLanguageSwitch(){
 const nav=d.querySelector('.desktop-nav'),mobile=d.querySelector('.mobile-menu');
 const clickLang=lang=>{
   localStorage.setItem('lada-lang',lang);
   if(window.LADA_I18N?.setLanguage)window.LADA_I18N.setLanguage(lang);
   else{d.documentElement.lang=lang;applyFaq(lang)}
   queueMicrotask(()=>{applyFaq(lang);normalizeFineLine();setBrand();syncFallback(lang)});
 };
 if(nav&&!nav.querySelector('.lang-switch')){
   const w=d.createElement('div');w.className='lang-switch';
   w.innerHTML='<button class="lang-switch__trigger" type="button" aria-label="Language"><span class="lang-switch__current">RU</span><i class="lang-switch__chev"></i></button><div class="lang-switch__menu"><button class="lang-switch__option" data-lang="lv" type="button">LV</button><button class="lang-switch__option" data-lang="ru" type="button">RU</button><button class="lang-switch__option" data-lang="en" type="button">EN</button></div>';
   nav.insertBefore(w,nav.querySelector('.btn')||null);
   w.querySelector('.lang-switch__trigger').addEventListener('click',e=>{e.stopPropagation();w.classList.toggle('open')});
   w.querySelectorAll('[data-lang]').forEach(x=>x.addEventListener('click',()=>{clickLang(x.dataset.lang);w.classList.remove('open')}));
   d.addEventListener('click',e=>{if(!e.target.closest('.lang-switch'))w.classList.remove('open')});
 }
 if(mobile&&!mobile.querySelector('.mobile-lang')){
   const x=d.createElement('div');x.className='mobile-lang';
   x.innerHTML='<button type="button" data-lang="lv">LV</button><button type="button" data-lang="ru">RU</button><button type="button" data-lang="en">EN</button>';
   mobile.prepend(x);
   x.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();clickLang(btn.dataset.lang)}));
 }
 syncFallback(getLang());
}
function syncFallback(lang){
 d.querySelectorAll('.lang-switch__current').forEach(x=>x.textContent=lang.toUpperCase());
 d.querySelectorAll('[data-lang]').forEach(x=>x.classList.toggle('active',x.dataset.lang===lang));
}

function setupCalendar(){
 const inp=d.querySelector('[data-whatsapp-form] input[name="dates"]');
 if(!inp)return;
 inp.type='date';
 const now=new Date(),pad=n=>String(n).padStart(2,'0');
 inp.min=`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
 inp.removeAttribute('placeholder');
 const update=lang=>{
   const label=inp.closest('label');if(!label)return;
   const node=[...label.childNodes].find(n=>n.nodeType===Node.TEXT_NODE&&n.nodeValue.trim());
   if(node)node.nodeValue=lang==='lv'?'Vēlamais datums':lang==='en'?'Preferred date':'Желаемая дата';
 };
 update(getLang());
 window.addEventListener('lada:language',e=>update(e.detail?.lang||getLang()));
}
const fmtDate=(v,lang)=>{
 if(!v)return '';
 const x=new Date(v+'T12:00:00');if(Number.isNaN(x.getTime()))return v;
 return new Intl.DateTimeFormat(lang==='lv'?'lv-LV':lang==='en'?'en-GB':'ru-RU',{day:'2-digit',month:'2-digit',year:'numeric'}).format(x);
};
function setupForm(){
 d.addEventListener('submit',e=>{
   const form=e.target.closest?.('[data-whatsapp-form]');if(!form)return;
   e.preventDefault();e.stopImmediatePropagation();
   const fd=new FormData(form),v=k=>String(fd.get(k)||'').trim(),lang=getLang(),date=fmtDate(v('dates'),lang),phone=form.dataset.phone||'37126666691';
   let msg;
   if(lang==='lv')msg=`Sveiki! Vēlos pieteikties tetovējumam.\n\nVārds: ${v('name')}\nIdeja / dizains: ${v('idea')}\nVieta uz ķermeņa: ${v('place')}\nIzmērs: ${v('size')}\nStils: ${v('type')}\nVēlamais datums: ${date}\nPilsēta: ${v('city')}`;
   else if(lang==='en')msg=`Hello! I would like to book a tattoo.\n\nName: ${v('name')}\nIdea / design: ${v('idea')}\nBody placement: ${v('place')}\nSize: ${v('size')}\nStyle: ${v('type')}\nPreferred date: ${date}\nCity: ${v('city')}`;
   else msg=`Здравствуйте! Хочу записаться на татуировку.\n\nИмя: ${v('name')}\nИдея / эскиз: ${v('idea')}\nМесто на теле: ${v('place')}\nРазмер: ${v('size')}\nНаправление: ${v('type')}\nЖелаемая дата: ${date}\nГород: ${v('city')}`;
   location.href=`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
 },true);
}

function setupLightbox(){
 const overlay=d.createElement('div');overlay.className='media-lightbox';overlay.setAttribute('aria-hidden','true');
 overlay.innerHTML='<button class="media-lightbox__close" type="button" aria-label="Close">×</button><div class="media-lightbox__stage"></div>';
 b.appendChild(overlay);
 const stage=overlay.querySelector('.media-lightbox__stage');let active=false;
 const close=()=>{overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');b.classList.remove('lightbox-open');stage.replaceChildren();active=false};
 const open=target=>{
   stage.replaceChildren();let node;
   if(target.matches('img')){node=d.createElement('img');node.src=target.currentSrc||target.src;node.alt=target.alt||''}
   else if(target.matches('.art')){const wrap=d.createElement('div');wrap.className='work-card lightbox-work';node=target.cloneNode(true);wrap.appendChild(node);node=wrap}
   else{node=target.cloneNode(true);node.removeAttribute?.('href')}
   node.classList?.remove('reveal','in','tilt-card','is-tilting','zoomable-media');
   stage.appendChild(node);active=true;overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');b.classList.add('lightbox-open');
 };
 const selector='.work-card .art,.cover-visual,.compare,.blog-art,img';
 d.querySelectorAll(selector).forEach(el=>{if(!el.closest('.portrait-visual')&&!el.closest('.media-lightbox'))el.classList.add('zoomable-media')});
 d.addEventListener('click',e=>{
   const t=e.target.closest(selector);if(!t||t.closest('.portrait-visual')||t.closest('.media-lightbox'))return;
   e.preventDefault();e.stopImmediatePropagation();open(t);
 },true);
 overlay.addEventListener('click',e=>{if(e.target===overlay||e.target===stage||e.target.closest('.media-lightbox__close'))close()});
 d.addEventListener('keydown',e=>{if(e.key==='Escape'&&active)close()});
}

function refresh(lang=getLang()){applyFaq(lang);normalizeFineLine();setBrand();syncFallback(lang)}
ensureLanguageSwitch();
setupCalendar();
setupLightbox();
setupForm();
refresh();
window.addEventListener('lada:language',e=>requestAnimationFrame(()=>refresh(e.detail?.lang||getLang())));
})();
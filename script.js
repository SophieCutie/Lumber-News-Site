(()=>{'use strict';const data=window.LUMBER_NEWS_DATA||{members:[],articles:[],social:[]};const $=s=>document.querySelector(s);const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=String(text);return n};const safeUrl=u=>{try{const x=new URL(u);return ['https:','http:'].includes(x.protocol)?x.href:null}catch{return null}};const avatars=new Map();async function loadAvatar(username,img){if(!username)return;try{let id=avatars.get(username);if(!id){const r=await fetch('https://users.roproxy.com/v1/usernames/users',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({usernames:[username],excludeBannedUsers:false})});if(!r.ok)throw Error('Lookup failed');const j=await r.json();id=j.data?.[0]?.id;if(!id)return;avatars.set(username,id)}const r=await fetch(`https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=${id}&size=150x150&format=Png&isCircular=false`);if(!r.ok)return;const j=await r.json();const url=j.data?.[0]?.imageUrl;if(url&&/^https:\/\//.test(url))img.src=url}catch{}}function avatar(m){const wrap=el('div','avatar');const img=el('img');img.alt=`Avatar of ${m.name}`;img.loading='lazy';img.src='avatar-placeholder.svg';wrap.append(img);loadAvatar(m.username,img);return wrap}function person(m){const card=el('div','person-card');card.append(avatar(m));const t=el('div');t.append(el('strong','',m.name),el('span','role',m.rank));if(m.username)t.append(el('small','username','@'+m.username));if(m.status)t.append(el('small','username',m.status));card.append(t);return card}const members=data.members||[];
// Rank-based organization chart: head → shared deputy managers → manager → trial manager → rank rows.
// Unlike the former single-supervisor tree, this chart shows Penqui under both deputies.
const tree=$('#team-tree');
const chart=el('div','org-chart');
function addLevel(title,group,levelClass){
  if(!group.length)return;
  const level=el('div','org-level '+(levelClass||''));
  if(title)level.append(el('div','org-level-title',title));
  const row=el('div','org-level-members');
  group.forEach(m=>row.append(person(m)));
  level.append(row);chart.append(level);
}
addLevel('',members.filter(m=>m.tier==='head'||m.rank==='Department Head'),'org-head');
addLevel('',members.filter(m=>m.tier==='deputy'||m.rank==='Deputy Manager'),'org-deputies');
addLevel('',members.filter(m=>m.rank==='Manager'),'org-manager');
addLevel('',members.filter(m=>m.rank==='Trial Manager'),'org-trial-manager');
addLevel('JOURNALISTS',members.filter(m=>m.rank==='Journalist'),'org-journalists');
addLevel('JUNIOR JOURNALISTS',members.filter(m=>m.rank==='Junior Journalist'),'org-juniors');
addLevel('TRAINEE JOURNALISTS',members.filter(m=>m.rank==='Trainee Journalist'),'org-trainees');
const ranked=new Set(['Department Head','Deputy Manager','Manager','Trial Manager','Journalist','Junior Journalist','Trainee Journalist']);
const extras=members.filter(m=>!ranked.has(m.rank));
addLevel('OTHER TEAM MEMBERS',extras,'org-other');
tree.replaceChildren(chart);
const profiles=$('#profile-grid');members.filter(m=>m.tier==='journalist'||m.featured).forEach(m=>{const card=el('article','profile-card');const top=el('div','profile-top');top.append(avatar(m));const details=el('div');details.append(el('h3','',m.name),el('span','pill',m.rank));if(m.username)details.append(el('div','username','@'+m.username));if(m.status)details.append(el('span','pill',m.status));top.append(details);card.append(top,el('p','quote','“'+(m.bio||'Introduction coming soon.')+'”'));if(m.joined)card.append(el('small','join-date','Joined '+m.joined));profiles.append(card)});if(!profiles.children.length)profiles.append(el('p','','Journalist profiles coming soon.'));$('#stat-members').textContent=members.length;
$('#stat-articles').textContent=(data.articles||[]).length;
const articles=(data.articles||[]).slice().sort((a,b)=>(b.date||'').localeCompare(a.date||''));
const categories=[...new Set(articles.map(a=>a.category).filter(Boolean))];
const select=$('#article-category');
categories.forEach(c=>{const o=el('option','',c);o.value=c;select.append(o)});
const more=$('#article-more');
let shown=24;
function renderArticles(){
  const q=$('#article-search').value.trim().toLowerCase();
  const cat=select.value;
  const list=$('#article-list');
  const filtered=articles.filter(a=>(cat==='all'||a.category===cat)&&
    [a.title,a.author,a.category,a.number,a.date,a.body].join(' ').toLowerCase().includes(q));
  list.replaceChildren();
  if(!filtered.length){list.append(el('p','empty','No publications match your search.'));more.hidden=true;return}
  filtered.slice(0,shown).forEach(a=>{
    const card=el('article','article-card');
    const left=el('div','article-content');
    const label=a.category+(a.number?' · #'+a.number:'');
    left.append(el('span','eyebrow',label),el('h3','',a.title||'Title not listed'));
    const meta=el('div','article-meta');
    if(a.author)meta.append(el('span','',a.author));
    meta.append(el('span','',a.date));
    left.append(meta);
    const reader=el('details','publication-reader');
    reader.append(el('summary','article-link','Read publication'));
    const body=el('div','publication-body');
    // Keep the published wording; remove Discord formatting markers for easier reading.
    body.textContent=(a.body||'Publication text unavailable.')
      .replace(/<(?:a)?:([\w-]+):\d+>/g,':$1:')
      .replace(/\*\*|__/g,'');
    reader.append(body);
    card.append(left,reader);list.append(card);
  });
  more.hidden=filtered.length<=shown;
  if(!more.hidden)more.textContent='Show more publications ('+(filtered.length-shown)+' remaining)';
}
$('#article-search').addEventListener('input',()=>{shown=24;renderArticles()});
select.addEventListener('change',()=>{shown=24;renderArticles()});
more.addEventListener('click',()=>{shown+=24;renderArticles()});
renderArticles();
const socials=$('#social-grid');(data.social||[]).forEach(s=>{const card=el('article','social-card');card.append(el('div','social-symbol',s.symbol||'✦'),el('h3','',s.name),el('p','',s.description));const link=safeUrl(s.url);const a=link?el('a','social-link','Visit '+s.name+' ↗'):el('span','social-link disabled','Link coming soon');if(link){a.href=link;a.target='_blank';a.rel='noopener noreferrer'}card.append(a);socials.append(card)});$('#year').textContent=new Date().getFullYear();const menu=$('.menu-toggle');menu.addEventListener('click',()=>{const open=$('#nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{$('#nav').classList.remove('open');menu.setAttribute('aria-expanded','false')}));const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}})},{rootMargin:'-30% 0px -60% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));})();

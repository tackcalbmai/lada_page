import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const pages=['index.html','portfolio.html','about.html','cover-up.html','preparation.html','aftercare.html','booking-info.html','booking.html','contacts.html','faq.html','privacy.html','404.html'];
const required=['favicon.svg','og-image.svg','robots.txt','sitemap.xml','assets/site.css','assets/premium.css','assets/refine.css','assets/motion.css','assets/social-fab.css','assets/production.css','assets/site.js'];
const errors=[];
for(const f of [...pages,...required]) if(!fs.existsSync(path.join(root,f))) errors.push(`Missing: ${f}`);
for(const f of pages){
  const s=fs.readFileSync(path.join(root,f),'utf8');
  if(/href=["']#["']/i.test(s)) errors.push(`${f}: contains href="#"`);
  if(/\bAVAZOR\b/i.test(s)) errors.push(`${f}: misspelled AVAZOR`);
  if(/lorem ipsum|prototype|test website/i.test(s)) errors.push(`${f}: release placeholder copy found`);
  if(!/<title>[^<]+<\/title>/i.test(s)) errors.push(`${f}: missing title`);
  if(f!=='404.html'&&!/rel=["']canonical["']/i.test(s)) errors.push(`${f}: missing canonical`);
  if(f!=='404.html'&&!/property=["']og:title["']/i.test(s)) errors.push(`${f}: missing Open Graph title`);
  for(const m of s.matchAll(/(?:href|src)=["']([^"']+)["']/g)){
    const u=m[1];
    if(/^(https?:|mailto:|tel:|#)/.test(u)) continue;
    const clean=u.split('#')[0].split('?')[0];
    if(!clean) continue;
    if(!fs.existsSync(path.join(root,clean))) errors.push(`${f}: broken local reference ${u}`);
  }
}
if(errors.length){
  console.error('\nAVAZZOR production audit failed:\n- '+errors.join('\n- '));
  process.exit(1);
}
console.log(`AVAZZOR production audit passed: ${pages.length} pages and ${required.length} required assets checked.`);

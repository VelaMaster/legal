
'use strict';
const $=id=>document.getElementById(id);
for(const button of document.querySelectorAll('[data-close]'))button.addEventListener('click',()=>$(button.dataset.close).close());
for(const dialog of document.querySelectorAll('dialog'))dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
for(const id of ['size-open','size-open-2'])$(id).addEventListener('click',()=>$('sizes').showModal());
$('privacy-open').addEventListener('click',()=>$('privacy').showModal());

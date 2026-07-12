const STEPS=[
  {id:"vocabulary",title:"Key Vocabulary"},
  {id:"language_takeaway",title:"Language Takeaway"},
  {id:"putting_it_together",title:"Putting It Together"},
  {id:"fluency_builder",title:"Fluency Builder"},
  {id:"audio_review",title:"Audio Review"},
{id:"original",title:"Original Text"}
];
let curLesson,curStep=0,audio,curUtterance=null;
function showHome(){const g=document.getElementById("lesson-grid");g.innerHTML="";for(const ls of LESSONS){const c=document.createElement("div");c.className="lesson-card";const vc=(ls.vocabulary||[]).length,lc=(ls.language_takeaway||[]).length;c.innerHTML='<div class="lesson-card-content"><div class="lesson-card-title">'+ls.title+'</div><div class="lesson-card-subtitle">'+vc+' vocab '+lc+' exprs</div></div><div class="lesson-card-arrow">\u2192</div>';c.onclick=()=>openLesson(ls);g.appendChild(c);}document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));document.getElementById("page-home").classList.add("active");}
function openLesson(ls){curLesson=ls;curStep=0;document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));document.getElementById("page-lesson").classList.add("active");document.getElementById("lesson-title").textContent=ls.title;setupAudio(ls);renderStep(0);}
function setupAudio(ls){audio=document.getElementById("audio-player");audio.src=ls.audio;audio.preload="auto";const pb=document.getElementById("play-btn"),pr=document.getElementById("progress-bar"),cu=document.getElementById("current-time"),to=document.getElementById("total-time");pb.onclick=()=>{if(audio.paused){audio.play().catch(()=>{});pb.innerHTML="\u25b6\u25b6";}else{audio.pause();pb.innerHTML="\u25b6";}};audio.onloadedmetadata=()=>{to.textContent=fmt(audio.duration);pr.max=Math.floor(audio.duration*10)/10;};audio.ontimeupdate=()=>{pr.value=audio.currentTime;cu.textContent=fmt(audio.currentTime);};audio.onended=()=>{pb.innerHTML="\u25b6";};pr.oninput=()=>{audio.currentTime=parseFloat(pr.value);};document.querySelectorAll(".spd").forEach(b=>{b.onclick=()=>{document.querySelectorAll(".spd").forEach(x=>x.classList.remove("act"));b.classList.add("act");audio.playbackRate=parseFloat(b.dataset.s);};});}
function renderStep(idx){curStep=idx;const step=STEPS[idx];document.getElementById("cur-step").textContent=idx+1;document.getElementById("step-title").textContent=step.title;document.querySelectorAll(".dot").forEach((d,i)=>d.classList.toggle("act",i===idx));document.getElementById("prev-step").style.visibility=idx===0?"hidden":"visible";document.getElementById("next-step").style.visibility=idx===STEPS.length-1?"hidden":"visible";const area=document.getElementById("content");switch(step.id){case"vocabulary":renderVocab(area);break;case"language_takeaway":renderLT(area);break;case"putting_it_together":renderPIT(area);break;case"fluency_builder":renderFB(area);break;case"audio_review":renderAR(area);break;case"original":renderOrig(area);break;}}
function esc(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/\n/g,"<br>");}
function spk(t){if(!t)return;window.speechSynthesis.cancel();curUtterance=new SpeechSynthesisUtterance(t);curUtterance.lang="en-US";curUtterance.rate=0.9;window.speechSynthesis.speak(curUtterance);}
function refreshSpk(){document.querySelectorAll(".spk").forEach(function(b){b.onclick=null;b.removeAttribute("onclick");b.addEventListener("click",function(e){e.stopPropagation();var t=this.getAttribute("data-t")||this.textContent.replace(/[^\w\s\']/g,"").trim();spk(t);});});}
function renderVocab(area){const a=curLesson.vocabulary||[];if(!a.length){area.innerHTML='<div class="empty">No vocabulary.</div>';return;}let h="";for(const v of a){h+='<div class="card"><div class="card-title">'+esc(v.word)+(v.ipa?'<span style="font-size:13px;color:#8B9DC3;font-style:italic;margin-left:6px">'+esc(v.ipa)+'</span>':'')+'<button class="spk" data-t="'+esc(v.word)+'" onclick="spk(this.dataset.t)">&#128266;</button></div>';if(v.meaning)h+='<div class="vocab-meaning">'+esc(v.meaning)+'</div>';h+='</div>';}area.innerHTML=h;refreshSpk();}
function renderLT(area){const a=curLesson.language_takeaway||[];if(!a.length){area.innerHTML='<div class="empty">No content.</div>';return;}let h="";for(const e of a){h+='<div class="card lt-card"><div class="card-title">'+esc(e.expression)+(e.ipa?'<span style="font-size:13px;color:#8B9DC3;font-style:italic;margin-left:6px">'+esc(e.ipa)+'</span>':'')+'<button class="spk" data-t="'+esc(e.expression)+'" onclick="spk(this.dataset.t)">&#128266;</button></div>';if(e.explanation)h+='<div class="card-explanation">'+esc(e.explanation)+'</div>';if(e.example_1)h+='<div class="card-example"><span class="card-example-label">Example 1</span>'+esc(e.example_1)+'</div>';if(e.example_2)h+='<div class="card-example"><span class="card-example-label">Example 2</span>'+esc(e.example_2)+'</div>';h+='</div>';}area.innerHTML=h;refreshSpk();}
function renderPIT(area){const a=curLesson.putting_it_together||[];if(!a.length){area.innerHTML='<div class="empty">No content.</div>';return;}let h="";for(const e of a){h+='<div class="card pit-card"><div class="card-title">'+esc(e.expression)+(e.ipa?'<span style="font-size:13px;color:#8B9DC3;font-style:italic;margin-left:6px">'+esc(e.ipa)+'</span>':'')+'<button class="spk" data-t="'+esc(e.expression)+'" onclick="spk(this.dataset.t)">&#128266;</button></div>';if(e.example_1)h+='<div class="card-example"><span class="card-example-label">Example 1</span>'+esc(e.example_1)+'</div>';if(e.example_2)h+='<div class="card-example"><span class="card-example-label">Example 2</span>'+esc(e.example_2)+'</div>';h+='</div>';}area.innerHTML=h;refreshSpk();}
function renderFB(area){const a=curLesson.fluency_builder||[];if(!a.length){area.innerHTML='<div class="empty">No content.</div>';return;}let h="";for(const f of a){h+='<div class="card fb-card"><div class="card-title">Fluency Builder</div>';if(f.original||f.native){h+='<div class="fl-row">';if(f.original)h+='<span class="fl-original">'+esc(f.original)+(f.ipa?'<span style="font-size:13px;color:#8B9DC3;font-style:italic;margin-left:6px">'+esc(f.ipa)+'</span>':'')+'<button class="spk" data-t="'+esc(f.original)+'" onclick="spk(this.dataset.t)">&#128266;</button></span>';if(f.original&&f.native)h+='<span class="fl-arrow">\u2192</span>';if(f.native)h+='<span class="fl-native">'+esc(f.native)+(f.ipa_native?'<span style="font-size:13px;color:#8B9DC3;font-style:italic;margin-left:6px">'+esc(f.ipa_native)+'</span>':'')+'<button class="spk" data-t="'+esc(f.native)+'" onclick="spk(this.dataset.t)">&#128266;</button></span>';h+='</div>';}if(f.explanation)h+='<div class="card-explanation">'+esc(f.explanation)+'</div>';h+='</div>';}area.innerHTML=h;refreshSpk();}
function renderAR(area){const a=curLesson.audio_review||[];if(!a.length){area.innerHTML='<div class="empty">No review items.</div>';return;}let h='<p style="text-align:center;font-size:13px;color:#B8B0A3;margin-bottom:14px">Match the meaning</p>';for(let i=0;i<a.length;i++){const r=a[i];const ee=esc(r.expression).replace(/'/g,"\\'");h+='<div class="review-item"><div class="review-question">'+esc(r.meaning)+'</div><button class="review-btn" onclick="showAns(\''+ee+'\',this)">Show Answer</button><div class="review-answer" style="display:none">'+(r.ipa?'<div style="font-size:12px;color:#8B9DC3;font-style:italic">'+esc(r.ipa)+'</div>':'')+'</div></div>';}area.innerHTML=h;refreshSpk();}
function showAns(ans,btn){const item=btn.parentElement;const answer=item.querySelector(".review-answer");answer.innerHTML=ans;const w=answer.style.display==="none";answer.style.display=w?"block":"none";btn.textContent=w?"Hide":"Show Answer";}
function fmt(s){if(!s||isNaN(s))return"0:00";const m=Math.floor(s/60),sc=Math.floor(s%60);return m+":"+(sc<10?"0":"")+sc;}
document.getElementById("back-home").onclick=showHome;
document.getElementById("prev-step").onclick=()=>{if(curStep>0)renderStep(curStep-1);};
document.getElementById("next-step").onclick=()=>{if(curStep<STEPS.length-1)renderStep(curStep+1);};
document.querySelectorAll(".dot").forEach(d=>d.onclick=()=>renderStep(parseInt(d.dataset.i)));
document.onkeydown=e=>{if(e.key==="ArrowLeft"&&curStep>0)renderStep(curStep-1);if(e.key==="ArrowRight"&&curStep<STEPS.length-1)renderStep(curStep+1);if(e.key===" "&&document.getElementById("page-lesson").classList.contains("active")){e.preventDefault();document.getElementById("play-btn").click();}};
showHome();


// ==== Word Lookup Tooltip ====
var lookupBtn = null;

document.addEventListener('mouseup', function(e) {
  setTimeout(function() {
    var sel = window.getSelection();
    var text = sel.toString().trim();
    removeLookupBtn();
    if (!text || text.length < 1 || text.length > 80) return;
    if (e.target.closest('button, input, textarea, .spk')) return;
    var range = sel.getRangeAt(0);
    var rect = range.getBoundingClientRect();
    lookupBtn = document.createElement('button');
    lookupBtn.className = 'lookup-btn';
    lookupBtn.textContent = '+ \u67e5\u8bcd';  // + 鏌ヨ瘝
    lookupBtn.style.position = 'fixed';
    lookupBtn.style.top = (rect.top - 38) + 'px';
    lookupBtn.style.left = (rect.left + rect.width / 2) + 'px';
    lookupBtn.style.transform = 'translateX(-50%)';
    lookupBtn.style.zIndex = '1000';
    lookupBtn.style.background = '#8B9DC3';
    lookupBtn.style.color = '#fff';
    lookupBtn.style.border = 'none';
    lookupBtn.style.padding = '5px 12px';
    lookupBtn.style.borderRadius = '7px';
    lookupBtn.style.fontSize = '13px';
    lookupBtn.style.cursor = 'pointer';
    lookupBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,.15)';
    lookupBtn.style.fontWeight = '600';
    lookupBtn.addEventListener('click', function() {
      removeLookupBtn();
      lookupWord(text);
    });
    document.body.appendChild(lookupBtn);
  }, 10);
});

document.addEventListener('mousedown', function(e) {
  if (lookupBtn && !e.target.closest('.lookup-btn')) {
    removeLookupBtn();
  }
});

document.addEventListener('scroll', function() {
  removeLookupBtn();
}, true);

function removeLookupBtn() {
  if (lookupBtn) { lookupBtn.remove(); lookupBtn = null; }
}

function lookupWord(w){
  closeLookup();
  var o=document.createElement("div");
  o.className="lookup-overlay";
  o.onclick=function(e){if(e.target===o)closeLookup();};
  var card=document.createElement("div");
  card.className="lookup-card";
  card.innerHTML='<div style="text-align:center;padding:30px;color:#888">Loading...</div>';
  o.appendChild(card);
  document.body.appendChild(o);
  var url="https://api.dictionaryapi.dev/api/v2/entries/en/"+encodeURIComponent(w);
  fetch(url).then(function(r){if(!r.ok)throw Error("Not found");return r.json();}).then(function(d){renderDictCard(card,w,d[0]);}).catch(function(){renderDictCard(card,w,null);});
}
function closeLookup(){var o=document.querySelector(".lookup-overlay");if(o)o.remove();}
function renderDictCard(card,word,data){
  var h='<button class="lookup-close" onclick="closeLookup()">x</button><div class="lookup-header">';
  h+='<div class="lookup-word">'+esc(word)+'</div>';
  if(data){
    if(data.phonetic)h+='<div class="lookup-phonetic">'+esc(data.phonetic)+'</div>';
    if(data.meanings){
      for(var i=0;i<data.meanings.length;i++){
        var m=data.meanings[i];
        h+='<div class="lookup-section"><div class="lookup-pos">'+esc(m.partOfSpeech)+'</div>';
        var defs=m.definitions||[];
        for(var j=0;j<Math.min(defs.length,2);j++){
          h+='<div class="lookup-def">'+esc(defs[j].definition)+'</div>';
          if(defs[j].example)h+='<div class="lookup-example">"'+esc(defs[j].example)+'"</div>';
        }
        h+='</div>';
      }
    }
  }else{
    h+='<div class="lookup-notfound">Word not found.</div>';
  }
  h+='</div><div class="lookup-save-area">';
  h+='<label class="lookup-label">释义 (required)</label>';
  h+='<input id="lookup-note" class="lookup-input" placeholder="Enter the meaning...">';
  h+='<label class="lookup-label">例句 (optional)</label>';
  h+='<input id="lookup-example" class="lookup-input" placeholder="Enter an example sentence...">';
  h+='<button class="lookup-save-btn">Save</button></div>';
  card.innerHTML=h;
  card.querySelector(".lookup-save-btn").onclick=function(){saveWord(word);};
}
function saveWord(word){
  var note=document.getElementById("lookup-note");
  var nt=note?note.value.trim():"";
  var ex=document.getElementById("lookup-example");
  var exText=ex?ex.value.trim():"";
  if(!nt){alert("Please enter a meaning.");note.focus();return;}
  var nb=JSON.parse(localStorage.getItem("wordNotebook")||"[]");
  if(nb.some(function(w){return w.word===word;})){closeLookup();return;}
  nb.push({word:word,note:nt,example:exText,added:new Date().toISOString().slice(0,10)});
  localStorage.setItem("wordNotebook",JSON.stringify(nb));
  closeLookup();
}



// Notebook

function renderOrig(area){
  var a=curLesson.original_text||[];
  if(!a.length){area.innerHTML='<div class="empty">No original text.</div>';return;}
  var h='';
  for(var i=0;i<a.length;i++){
    h+='<div class="ot-line">'+esc(a[i])+'</div>';
  }
  area.innerHTML=h;
}

function initNB(){var b=document.createElement("button");b.className="nb-btn";b.textContent="[NB]";b.title="Word Notebook";b.onclick=showNB;document.body.appendChild(b);}
function showNB(){
  closeLookup();
  var nb=JSON.parse(localStorage.getItem("wordNotebook")||"[]");
  var o=document.createElement("div");o.className="lookup-overlay";o.onclick=function(e){if(e.target===o)o.remove();};
  var h='<div class="lookup-card" style="max-width:420px"><button class="lookup-close" onclick="this.closest(\'.lookup-overlay\').remove()">x</button>';
  h+='<div style="font-size:17px;font-weight:600;margin-bottom:12px">Word Notebook ('+nb.length+')</div>';
  if(!nb.length){h+='<div style="text-align:center;padding:20px;color:#8E8E8E">No words saved.</div>';}else{
    for(var i=nb.length-1;i>=0;i--){var w=nb[i];
      h+='<div class="nb-word-row">';
      h+='<div class="nb-word-info"><div class="nb-word-title">'+esc(w.word)+'</div>';
      if(w.note)h+='<div class="nb-word-meaning">'+esc(w.note)+'</div>';
      if(w.example)h+='<div class="nb-word-example">'+esc(w.example)+'</div>';
      h+='<div class="nb-word-date">'+esc(w.added)+'</div></div>';
      h+='<button class="nb-del-btn" onclick="deleteWord(\''+esc(w.word).replace(/'/g,"\\'")+'\')">\u2716</button>';
      h+='</div>';}
  }
  h+='</div>';o.innerHTML=h;document.body.appendChild(o);
}
function deleteWord(word){
  if(!confirm("Delete \""+word+"\" from notebook?"))return;
  var nb=JSON.parse(localStorage.getItem("wordNotebook")||"[]");
  nb=nb.filter(function(w){return w.word!==word;});
  localStorage.setItem("wordNotebook",JSON.stringify(nb));
  showNB();
}
setTimeout(initNB,500);

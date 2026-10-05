const DEFAULT={xp:0,xpToday:0,streak:0,vault:0,weight:190,weights:[],protein:0,workout:"A",quests:{breakfast:false,training:false,lunch:false,dinner:false,sweet:false},meals:{breakfast:false,lunch:false,dinner:false,sweet:false},content:[]};
let state=JSON.parse(localStorage.getItem("lockin-v01")||"null")||structuredClone(DEFAULT);
const $=s=>document.querySelector(s); const save=()=>localStorage.setItem("lockin-v01",JSON.stringify(state));
const quests=[
 ["breakfast","Breakfast","Protein shake + banana",25],
 ["training","Body Mission","Hart / Home / Minimum Mission",150],
 ["lunch","Post-Training Lunch","Protein + rice + vegetables",35],
 ["dinner","Warrior Dinner","Protein + portioned rice + vegetables",35],
 ["sweet","Protein / Sweet Check","Planned option; no grazing",20]
];
const meals=[
 ["breakfast","BREAKFAST","Shake providing ~40–50g protein + banana"],
 ["lunch","LUNCH","~6 oz chicken/tilapia + ~1 cup rice + vegetables"],
 ["dinner","DINNER","~6 oz protein + ¾–1 cup rice + vegetables"],
 ["sweet","SWEET CHECK","Greek yogurt + fruit; shake if protein is low"]
];
const A=["Squat — 2×8–12","Push — 2×8–12","Row — 2×8–12","Romanian deadlift — 2×8–12","Assisted pull-up / pulldown — 2×8–12","Plank — 2×20–30 sec"];
const B=["Squat / leg press — 2×8–12","Incline press — 2×8–12","Seated / DB row — 2×8–12","Split squat — 2×8–12/leg","Assisted pull-up / pulldown — 2×8–12","Dead bug — 2×8–12/side"];
function addXP(n,reason){state.xp+=n;state.xpToday+=n;capture("WIN",`${reason} (+${n} XP)`);save();render();}
function capture(type,text){state.content.unshift({type,text,at:new Date().toLocaleString()});state.content=state.content.slice(0,40);}
function modal(title,text){$("#modalTitle").textContent=title;$("#modalText").textContent=text;$("#systemModal").classList.remove("hidden")}
function completeQuest(id,xp){if(state.quests[id])return;state.quests[id]=true;if(state.meals[id]!==undefined)state.meals[id]=true;addXP(xp,`${quests.find(q=>q[0]===id)?.[1]||id} completed`);modal("QUEST COMPLETE",`Mission confirmed. +${xp} XP.`)}
function rank(){const l=Math.floor(state.xp/500)+1;const ranks=["E-RANK","D-RANK","C-RANK","B-RANK","A-RANK","S-RANK"];return {l,r:ranks[Math.min(ranks.length-1,Math.floor((l-1)/4))]}}
function render(){
 const rr=rank();$("#level").textContent=`LV ${rr.l}`;$("#rankName").textContent=rr.r;$("#xpToday").textContent=state.xpToday;$("#vaultCount").textContent=state.vault;$("#proteinTotal").textContent=state.protein;$("#weightDisplay").textContent=Number(state.weight).toFixed(1);$("#streakDisplay").textContent=state.streak;$("#totalXP").textContent=state.xp;
 $("#questList").innerHTML=quests.map(q=>`<div class="quest ${state.quests[q[0]]?'done':''}"><button data-q="${q[0]}">${state.quests[q[0]]?'✓':'○'}</button><div><div class="name">${q[1]}</div><div class="sub">${q[2]} • +${q[3]} XP</div></div></div>`).join("");
 document.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>completeQuest(b.dataset.q,quests.find(q=>q[0]===b.dataset.q)[3]));
 const next=quests.find(q=>!state.quests[q[0]]);$("#directive").textContent=next?`NEXT MISSION: ${next[1]} — ${next[2]}`:"ALL REQUIRED MISSIONS COMPLETE. Recover. Prepare tomorrow.";
 $("#mealList").innerHTML=meals.map(m=>`<div class="meal ${state.meals[m[0]]?'done':''}"><button data-meal="${m[0]}">${state.meals[m[0]]?'✓':'○'}</button><div><div class="name">${m[1]}</div><div class="sub">${m[2]}</div></div></div>`).join("");
 document.querySelectorAll("[data-meal]").forEach(b=>b.onclick=()=>completeQuest(b.dataset.meal,quests.find(q=>q[0]===b.dataset.meal)?.[3]||10));
 $("#workoutTitle").textContent=`FULL BODY ${state.workout}`;const ex=state.workout==="A"?A:B;$("#exerciseList").innerHTML=ex.map((x,i)=>`<div class="exercise"><button data-ex="${i}">○</button><div class="name">${x}</div></div>`).join("");document.querySelectorAll("[data-ex]").forEach(b=>b.onclick=()=>{b.textContent=b.textContent==="✓"?"○":"✓";b.parentElement.classList.toggle("done")});
 $("#weightHistory").innerHTML=state.weights.slice(0,8).map(w=>`<div>${w.at} — <strong>${w.value} lb</strong></div>`).join("")||"No entries yet.";
 $("#contentFeed").innerHTML=state.content.map(c=>`<div class="content-item"><strong>[${c.type}] ${c.text}</strong><small>${c.at}</small></div>`).join("")||"Complete a mission, fail a mission, log weight, or add a side quest. The System will build your story log here.";
 save();
}

document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>{document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));b.classList.add("active");$("#"+b.dataset.view).classList.add("active")});
$("#closeModal").onclick=()=>$("#systemModal").classList.add("hidden");
$("#toggleWorkout").onclick=()=>{state.workout=state.workout==="A"?"B":"A";save();render()};
$("#completeWorkout").onclick=()=>completeQuest("training",150);
$("#addProtein").onclick=()=>{let n=Number($("#proteinAdd").value||0);if(n>0){state.protein+=n;capture("FUEL",`Logged ${n}g protein — ${state.protein}/160g today`);$("#proteinAdd").value="";save();render();if(state.protein>=160)modal("PROTEIN TARGET CLEARED","160g target reached. Fuel mission secured.")}};
$("#logWeight").onclick=()=>{let n=Number($("#weightInput").value);if(n>0){state.weight=n;state.weights.unshift({value:n.toFixed(1),at:new Date().toLocaleDateString()});capture("PROGRESS",`Weigh-in: ${n.toFixed(1)} lb`);$("#weightInput").value="";save();render()}};
$("#failMission").onclick=()=>{state.vault++;capture("PENALTY",`Required mission failed. 1 Pokémon pack entered the Penalty Vault.`);save();render();modal("PENALTY QUEST ACTIVATED","One sealed Pokémon pack has been forfeited to the Penalty Vault. Record the failure, execute the safe penalty protocol, and use it as content. Do not use injury, dehydration, food restriction, or dangerous exhaustion as punishment.")};
$("#addSideQuest").onclick=()=>{const name=prompt("Side quest / challenge name:");if(name){capture("SIDE QUEST",name);save();render()}};
let timer=90,interval=null;function showTimer(){let m=Math.floor(timer/60),s=timer%60;$("#timerDisplay").textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`};$("#startTimer").onclick=()=>{clearInterval(interval);interval=setInterval(()=>{timer--;showTimer();if(timer<=0){clearInterval(interval);modal("REST COMPLETE","Next set. Move.");timer=90;showTimer()}},1000)};$("#resetTimer").onclick=()=>{clearInterval(interval);timer=90;showTimer()};
render();showTimer();

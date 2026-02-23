// Enhanced interactive behaviors for the demo
document.addEventListener('DOMContentLoaded', ()=>{
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if(navToggle){ navToggle.addEventListener('click', ()=>{ mobileMenu.classList.toggle('hidden'); mobileMenu.toggleAttribute('aria-hidden'); }); }

  // Preloader
  const pre = document.getElementById('preloader');
  if(pre){ setTimeout(()=>pre.classList.add('hidden'), 600); }

  // Feature cards
  document.querySelectorAll('.feature-card').forEach(card => {
    const act = ()=>{
      const feature = card.dataset.feature || 'Fitur';
      showToast(`${feature} dipilih — lihat di halaman Layanan untuk detail.`);
    };
    card.addEventListener('click', act);
    card.addEventListener('keypress', (e)=>{ if(e.key === 'Enter' || e.key === ' ') act(); });
  });

  // Signup modal
  const open = document.getElementById('open-signup');
  const openMobile = document.getElementById('open-signup-mobile');
  if(open) open.addEventListener('click', ()=>openSignup());
  if(openMobile) openMobile.addEventListener('click', ()=>openSignup());

  // Pricing toggle
  const btnMonthly = document.getElementById('toggle-monthly');
  const btnYearly = document.getElementById('toggle-yearly');
  if(btnMonthly && btnYearly){
    const setMonthly = ()=>{ btnMonthly.classList.add('bg-slate-900/20'); btnYearly.classList.remove('bg-slate-900/20'); updatePrices('monthly'); };
    const setYearly = ()=>{ btnYearly.classList.add('bg-slate-900/20'); btnMonthly.classList.remove('bg-slate-900/20'); updatePrices('yearly'); };
    btnMonthly.addEventListener('click', setMonthly);
    btnYearly.addEventListener('click', setYearly);
    // default
    setMonthly();
  }
});

function showToast(msg){
  const t = document.createElement('div');
  t.className = 'fixed bottom-8 right-8 bg-slate-900/80 text-slate-100 p-3 rounded-lg shadow-lg';
  t.style.backdropFilter = 'blur(6px)';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=>{ t.style.transition='opacity .4s'; t.style.opacity='0'; setTimeout(()=>t.remove(),400); },3000);
}

function handleContact(e){
  e.preventDefault();
  showToast('Terima kasih — pesan Anda telah dikirim (demo).');
  e.target.reset?.();
}

function openSignup(){
  // build modal
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="Formulir Pendaftaran">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold neon-text">Daftar Reincity Cloud</h3>
        <button id="close-modal" aria-label="Tutup">✕</button>
      </div>
      <form id="signup-form" class="mt-4 grid gap-3">
        <input required name="name" placeholder="Nama" class="p-3 bg-slate-800/40 rounded" />
        <input required name="email" type="email" placeholder="Email" class="p-3 bg-slate-800/40 rounded" />
        <div class="flex gap-2">
          <button class="btn-primary" type="submit">Daftar</button>
          <button type="button" id="cancel" class="btn-ghost">Batal</button>
        </div>
      </form>
    </div>`;
  document.body.appendChild(modal);
  document.getElementById('close-modal').addEventListener('click', ()=>modal.remove());
  document.getElementById('cancel').addEventListener('click', ()=>modal.remove());
  document.getElementById('signup-form').addEventListener('submit', (e)=>{ e.preventDefault(); showToast('Terima kasih! Akun demo dibuat.'); modal.remove(); });
}

function updatePrices(mode){
  // simple demo: update price text
  document.querySelectorAll('.price-amount').forEach(el=>{
    const base = el.textContent.replace(/[Rp.\s\/blntaun]/g,'').replace(/,/g,'');
    // fallback mapping by dataset or text
    if(mode === 'monthly'){
      if(el.closest('.featured')) el.textContent = 'Rp199.000';
      else if(el.textContent.includes('0')) el.textContent = 'Rp0';
    } else {
      // yearly - 12 months with 20% discount shown as yearly
      if(el.closest('.featured')) el.textContent = 'Rp1.910.400';
      else if(el.textContent.includes('0')) el.textContent = 'Rp0';
    }
  });
}

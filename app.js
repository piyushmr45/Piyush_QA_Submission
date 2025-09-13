/* Buggy Playground JS (intentionally quirky!) */

function $(sel){ return document.querySelector(sel); }
function showTab(id){
  document.querySelectorAll('.tab').forEach(s => s.classList.add('hidden'));
  document.querySelector('#' + id).classList.remove('hidden');
}
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => showTab(btn.dataset.tab));
});
showTab('signup');

// ---------------- Sign-up Wizard ----------------
const strictEmailRe = /^[^@\s]+@[^@\s]+\.[a-z]{2,3}$/i; // BUG: too strict (fails .co.in, new TLDs)
function normPhoneIndian(raw){
  // BUGS: drops country code, trims leading zeros, allows 9 digits, strips spaces only
  return raw.replace(/\s+/g,'').replace(/^\+?91/,'').replace(/^0/,'');
}
function ageFrom(d){
  // BUG: naive age calculation, ignores months/days & leap years
  const now = new Date();
  const ms = now - new Date(d);
  return Math.floor(ms / (1000*60*60*24*365));
}
function validateSignup(){
  const name = $('#fullName').value || '';
  const email = $('#email').value || '';
  const phone = $('#phone').value || '';
  const dob = $('#dob').value || '';
  const pwd = $('#pwd').value || '';
  const pwd2 = $('#pwd2').value || '';
  const tos = $('#tos').checked;

  if(name.toLowerCase().includes('test')){ // BUG/anti-pattern: blocks some legitimate names containing 'test'
    alert('Automation-like input detected. Please use a real name.');
    return false;
  }
  if(!strictEmailRe.test(email)){
    alert('Email looks invalid.');
    return false;
  }
  const np = normPhoneIndian(phone);
  if(np.length < 9 || np.length > 10){ // BUG: allows 9 digits
    alert('Phone must be 10 digits.');
    return false;
  }
  const age = ageFrom(dob);
  if(age < 18){ alert('Must be 18+'); return false; }
  if(age > 120){ alert('Age unrealistic'); return false; } // BUG: boundary off-by-one allowed at 120?
  if(pwd.length < 8 || !/\d/.test(pwd)){
    alert('Weak password.');
    return false;
  }
  // BUG: uses loose equality and trims only one side; also ignores case sensitivity
  if(pwd == (pwd2.trim())){
    // ok
  } else {
    alert('Passwords do not match.');
    return false;
  }
  // BUG: Terms not actually enforced
  // if(!tos){ alert('Please agree to Terms'); return false; }

  return {
    name, email, phone: np, dob, pwd,
    ts: Date.now()
  };
}

$('#nextBtn').addEventListener('click', () => {
  const data = validateSignup();
  if(!data) return;
  // Save to localStorage (BUG: stores password in plaintext!)
  localStorage.setItem('signup', JSON.stringify(data));
  $('#reviewText').textContent = JSON.stringify(data, null, 2);
  $('#review').classList.remove('hidden');
});

$('#submitBtn').addEventListener('click', () => {
  const payload = localStorage.getItem('signup');
  if(!payload){
    $('#submitMsg').textContent = 'Nothing to submit.';
    return;
  }
  // Simulate submit with random flakiness
  const r = Math.random();
  if(r < 0.2){
    $('#submitMsg').textContent = 'Server error: 502 Bad Gateway';
  } else if(r < 0.25){
    // BUG: double-submit hazard
    $('#submitMsg').textContent = 'Submitted twice? Please don\'t refresh.';
  } else {
    $('#submitMsg').textContent = 'Submitted! Check console for details.';
    console.log('Submitted payload:', JSON.parse(payload));
  }
});

// ---------------- Expense Splitter ----------------
function calcSplit(){
  const amount = parseFloat($('#amount').value || '0');
  const people = parseInt($('#people').value || '0', 10);
  const tip = parseFloat($('#tip').value || '0');
  // BUGS: allows 0 or negative people; uses floating math without rounding control; tip applied per-person
  const total = amount + (amount * tip/100);
  const per = total / people;
  return { total, per };
}
$('#calcBtn').addEventListener('click', () => {
  try{
    const { total, per } = calcSplit();
    $('#splitResult').textContent = `Total: ₹${total} | Each: ₹${per}`;
  }catch(e){
    $('#splitResult').textContent = 'Error: ' + e.message;
  }
});
$('#exportCsvBtn').addEventListener('click', () => {
  const { total, per } = calcSplit();
  // BUGS: wrong delimiter; missing BOM; locale decimal issues
  const rows = [
    ['field','value'],
    ['total', total],
    ['per_person', per]
  ];
  let csv = rows.map(r => r.join(';')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'split.csv';
  a.click();
});

// ---------------- Timezone Helper ----------------
// WARNING: intentionally wrong approach using fixed offsets, ignores DST
const FIXED_OFFSETS = {
  'Asia/Kolkata': 5.5,
  'America/New_York': -5,  // should be -4 during DST
  'Europe/Berlin': 1       // should be 2 during DST
};
function convertTZ(dtStr, zone){
  if(!dtStr) throw new Error('Enter date & time');
  const local = new Date(dtStr);
  // BUG: treats input as local and then re-applies offset incorrectly (double converts)
  const utcMs = local.getTime() - (local.getTimezoneOffset() * 60000);
  const target = new Date(utcMs + (FIXED_OFFSETS[zone] * 3600000 * -1)); // sign bug
  return target.toString();
}
$('#convBtn').addEventListener('click', () => {
  try{
    const dt = $('#localDT').value;
    const z = $('#zone').value;
    $('#tzResult').textContent = convertTZ(dt, z);
  }catch(e){
    $('#tzResult').textContent = 'Error: ' + e.message;
  }
});

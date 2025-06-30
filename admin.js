// Tab control
document.querySelectorAll('.sidebar nav button').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.sidebar nav button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  };
});

// Data storage keys
const KEY_LB = 'admin_lb';
const KEY_EVENTS = 'admin_events';
const KEY_MOCKS = 'admin_mocks';
const KEY_MEETINGS = 'admin_meetings';
const KEY_ASSIGN = 'admin_assign';

// 🏆 Leaderboard
const lbTable = document.querySelector('#lbTable tbody');
function loadLB() {
  lbTable.innerHTML = '';
  const arr = JSON.parse(localStorage.getItem(KEY_LB) || '[]');
  arr.forEach((e, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i + 1}</td><td>${e.name}</td><td>${e.rating}</td>
      <td><button onclick="removeLB(${i})">Remove</button></td>`;
    lbTable.appendChild(tr);
  });
}
window.removeLB = i => {
  const arr = JSON.parse(localStorage.getItem(KEY_LB) || '[]');
  arr.splice(i, 1);
  localStorage.setItem(KEY_LB, JSON.stringify(arr));
  loadLB();
};
document.getElementById('addLb').onclick = () => {
  const n = prompt('Name:'), r = prompt('Rating:');
  if (n && r) {
    const arr = JSON.parse(localStorage.getItem(KEY_LB) || '[]');
    arr.push({ name: n, rating: r });
    localStorage.setItem(KEY_LB, JSON.stringify(arr));
    loadLB();
  }
};
loadLB();

// 📅 Events
const evI = document.getElementById('eventsInput');
evI.value = (JSON.parse(localStorage.getItem(KEY_EVENTS)) || []).join('\n');
document.getElementById('saveEvents').onclick = () => {
  const arr = evI.value.split('\n').map(l => l.trim()).filter(l => l);
  localStorage.setItem(KEY_EVENTS, JSON.stringify(arr));
  alert('✅ Events saved');
};

// 📝 Mock Tests
const mkI = document.getElementById('mocksInput');
mkI.value = (JSON.parse(localStorage.getItem(KEY_MOCKS)) || []).join('\n');
document.getElementById('saveMocks').onclick = () => {
  const arr = mkI.value.split('\n').map(l => l.trim()).filter(l => l);
  localStorage.setItem(KEY_MOCKS, JSON.stringify(arr));
  alert('✅ Mock tests saved');
};

// 📆 Meetings
const mtType = document.getElementById('meetingType');
const mtLink = document.getElementById('meetingLink');
const mtList = document.getElementById('meetingList');
function loadMeetings() {
  mtList.innerHTML = '';
  const obj = JSON.parse(localStorage.getItem(KEY_MEETINGS) || '{}');
  Object.keys(obj).forEach(type => {
    obj[type].forEach(link => {
      const li = document.createElement('li');
      li.innerHTML = `${type.toUpperCase()}: <a href="${link}" target="_blank">Join</a>`;
      mtList.appendChild(li);
    });
  });
}
document.getElementById('saveMeeting').onclick = () => {
  const link = mtLink.value.trim(), type = mtType.value;
  if (link) {
    const obj = JSON.parse(localStorage.getItem(KEY_MEETINGS) || '{}');
    if (!obj[type]) obj[type] = [];
    obj[type].push(link);
    localStorage.setItem(KEY_MEETINGS, JSON.stringify(obj));
    mtLink.value = '';
    loadMeetings();
  }
};
loadMeetings();

// 📂 Assignments
const asCat = document.getElementById('assignCat');
const asInput = document.getElementById('assignInput');
const allAs = JSON.parse(localStorage.getItem(KEY_ASSIGN) || '{}');
asInput.value = (allAs[asCat.value] || []).join('\n');
asCat.onchange = () => {
  const obj = JSON.parse(localStorage.getItem(KEY_ASSIGN) || '{}');
  asInput.value = (obj[asCat.value] || []).join('\n');
};
document.getElementById('saveAssign').onclick = () => {
  const obj = JSON.parse(localStorage.getItem(KEY_ASSIGN) || '{}');
  obj[asCat.value] = asInput.value.split('\n').filter(l => l.trim());
  localStorage.setItem(KEY_ASSIGN, JSON.stringify(obj));
  alert('✅ Assignments saved');
};

// 🚪 Logout functionality
window.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      console.log('Logout clicked');
      localStorage.removeItem('isAdmin');
      window.location.href = 'admin-login.html';
    });
  } else {
    console.error('Logout button not found!');
  }
});

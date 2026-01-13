
document.getElementById("result").value = "Ki fog ma felelni?...";


function generateRandom() {
    const min = parseInt(document.getElementById("min").value);
    const max = parseInt(document.getElementById("max").value);
    const count = parseInt(document.getElementById("count").value);

    if (isNaN(min) || isNaN(max) || isNaN(count)) {
        alert("Kérlek, adj meg érvényes számokat!");
        return;
    }

    if (min > max) {
        alert("A minimum érték nem lehet nagyobb mint a maximumnál!");
        return;
    }

    let result = "";
    for (let i = 0; i < count; i++) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        result += randomNum + " ";
    }

    document.getElementById("result").value = result;
}
function setPreset(index) {
  const presets = {
    1: { min: 1, max: 29, count: 1 },
    2: { min: 1, max: 30, count: 1 },
    3: { min: 1, max: 31, count: 1 },
    4: { min: 1, max: 32, count: 1 },
    5: { min: 1, max: 33, count: 1 },
    6: { min: 1, max: 34, count: 1 },
  };

  const p = presets[index];
  if (!p) return; // invalid index

  document.getElementById("min").value = p.min;
  document.getElementById("max").value = p.max;
  document.getElementById("count").value = p.count;
}


// --- Press-and-hold logic for the Generate button (3 seconds) ---
(function() {
  const btn = document.getElementById('generateBtn');
  if (!btn) return;

  const HOLD_TIME = 3000; // milliseconds
  let holdTimeout = null;
  let intervalId = null;
  let endTime = 0;

  function startHold(e) {
    // prevent synthetic mouse events from touch
    e.preventDefault();
    if (holdTimeout) return; // already holding

    btn.classList.add('holding');
    endTime = Date.now() + HOLD_TIME;
    // update text immediately
    btn.textContent = '3...';

    intervalId = setInterval(() => {
      const remaining = Math.max(0, endTime - Date.now());
      btn.textContent = '' + Math.ceil(remaining / 1000) + '...';
    }, 100);

    holdTimeout = setTimeout(() => {
      clearInterval(intervalId);
      intervalId = null;
      holdTimeout = null;
      btn.classList.remove('holding');
      btn.textContent = '...';
      // restore label shortly after, then call generate
      setTimeout(() => { 
        btn.textContent = '▶︎';
        generateRandom();
      }, 1500);

    }, HOLD_TIME);
  }

  function cancelHold() {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      holdTimeout = null;
    }
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    btn.classList.remove('holding');
    btn.textContent = '▶︎';
  }

  // mouse
  btn.addEventListener('mousedown', startHold);
  btn.addEventListener('mouseup', cancelHold);
  btn.addEventListener('mouseleave', cancelHold);
  // touch
  btn.addEventListener('touchstart', startHold, {passive:false});
  btn.addEventListener('touchend', cancelHold);
  btn.addEventListener('touchcancel', cancelHold);
  // keyboard (space/enter)
  btn.addEventListener('keydown', (ev) => {
    if (ev.key === ' ' || ev.key === 'Enter') startHold(ev);
  });
  btn.addEventListener('keyup', (ev) => {
    if (ev.key === ' ' || ev.key === 'Enter') cancelHold(ev);
  });
})();

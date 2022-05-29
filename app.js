const keyboard = {
   key_layout: {
      1: ['', '၁'],
      2: ['', '၂'],
      3: ['', '၃'],
      4: ['', '၄'],
      5: ['', '၅'],
      6: ['', '၆'],
      7: ['', '၇'],
      8: ['', '၈'],
      9: ['', '၉'],
      0: ['', '၀'],
      'blank-1': [''],
      q: ['ဈ', 'ဆ'],
      w: ['ဝ', 'တ'],
      e: ['ဣ', 'န'],
      r: ['၎င်း', 'မ'],
      t: ['ဤ', 'အ'],
      y: ['၌', 'ပ'],
      u: ['ဥ', 'က'],
      i: ['၍', 'င'],
      o: ['ဿ', 'သ'],
      p: ['ဏ', 'စ'],
      backspace: ['backspace'],
      shift: ['shift'],
      a: ['ဗ', 'ေ'],
      s: ['ှ', 'ျ'],
      d: ['ီ', 'ိ'],
      f: ['', '်'],
      g: ['ါ', 'ွ'],
      h: ['ံ', '့'],
      j: ['ဲ', 'ြ'],
      k: ['ဒ', 'ု'],
      l: ['ဓ', 'ူ'],
      enter: ['enter'],
      'blank-2': [''],
      z: ['ဇ', 'ဖ'],
      x: ['ဌ', 'ထ'],
      c: ['ဃ', 'ခ'],
      v: ['ဠ', 'လ'],
      b: ['ယ', 'ဘ'],
      n: ['ဉ', 'ည'],
      m: ['ဦ', 'ာ'],
      ',': ['၊', '။'],
      '.': ['ရ', '္'],
      '?': ['', '?'],
      'blank-3': [''],
      '[': ['ဧ', 'ဟ'],
      ';': ['ဂ', 'း'],
      space: ['space'],
      '/': ['ႅ', '၏'],
      ']': ['ဪ', 'ဩ'],
   },
   connected: true,
   shift_key: null,
   value: '',
};

const inputBox = document.getElementById('input-box');

function init() {
   const keyboardCtr = document.createElement('div');
   keyboardCtr.classList.add('keyboard-ctr');
   keyboardCtr.setAttribute('id', 'k-ctr');
   keyboardCtr.style.transition = 'opacity 1s';
   const keyboardKeys = document.createElement('div');
   keyboardKeys.classList.add('keyboard-keys');

   inputBox.value = '';

   Object.entries(keyboard.key_layout).forEach((pair, i) => {
      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.classList.add('key');
      const value = pair[1];
      const key = pair[0];

      const eve = new KeyboardEvent('keydown', { key });
      button.addEventListener('click', () => document.dispatchEvent(eve));

      if (i === 10 || i === 33 || i === 44) {
         return keyboardKeys.appendChild(button);
      }

      if (value.length > 1) {
         button.classList.add('key', 'multi-key');
         button.innerHTML = `<span>${key}</span>
         <span>${value[0]}</span>
         <span>${value[1]}</span>`;
         return keyboardKeys.appendChild(button);
      }

      switch (key) {
         case 'backspace':
            button.innerHTML = createCustomKey('backspace');
            break;
         case 'shift':
            button.innerHTML = createCustomKey('arrow-alt-circle-up');
            button.setAttribute('id', 'k-shift');
            break;
         case 'enter':
            button.innerHTML = createCustomKey('level-down-alt');
            button.firstElementChild.style.transform = 'rotate(90deg)';
            break;
         case 'space':
            button.innerHTML = createCustomKey('ruler-horizontal');
            button.classList.add('key-common');
            break;
         default:
            button.innerText = key;
      }

      keyboardKeys.appendChild(button);
   });
   keyboardCtr.appendChild(keyboardKeys);
   document.body.appendChild(keyboardCtr);
}

const handleKeyDown = (e) => {
   const layout = keyboard.key_layout;
   const key = e.key.toLowerCase();
   prevState = inputBox.value;

   switch (key) {
      case 'backspace':
         inputBox.value = prevState.slice(0, -1);
         break;
      case 'enter':
         inputBox.value += '\n';
         break;
      case ' ':
         inputBox.value += ' ';
         break;
      case 'shift':
         handleShiftKey();
         break;
      default:
         inputBox.value += keyboard.shift_key ? layout[key][0] : layout[key][1];
   }
};

const handleKeyUp = (e) => {
   if (e.key !== 'Shift') return;
   keyboard.shift_key = false;
   const shift = document.getElementById('k-shift');
   shift.classList.remove('cap-on');
};

document.addEventListener('DOMContentLoaded', () => {
   init();

   const copy = document.getElementById('copy');
   const bind = document.getElementById('connect');
   const keyboardCtr = document.getElementById('k-ctr');

   document.addEventListener('keydown', (e) => clickFunc(e, handleKeyDown));
   document.addEventListener('keyup', (e) => clickFunc(e, handleKeyUp));

   bind.onclick = () => {
      const isConnected = keyboard.connected;
      isConnected ? inputBox.focus() : null;
      keyboardCtr.style.pointerEvents = isConnected ? 'none' : 'auto';
      inputBox.style.pointerEvents = isConnected ? 'auto' : 'none';
      keyboardCtr.style.opacity = isConnected ? '.5' : '1';
      bind.innerText = isConnected ? 'Disconnected': 'Connected';
      keyboard.connected = !isConnected;
   };

   copy.onclick = () => {
      navigator.clipboard.writeText(inputBox.value);
      copy.innerText = 'Copied!!';
      setTimeout(() => {
         copy.innerText = 'Copy';
      }, 3000);
   };
});

const createCustomKey = (iconName) => `<i class="fas fa-${iconName}"></i>`;

const clickFunc = (e, fn) => {
   if (!keyboard.connected || e.key === null) return;
   fn(e);
};

const handleShiftKey = () => {
   const shift = document.getElementById('k-shift');
   keyboard.shift_key ? shift.classList.remove('cap-on') : shift.classList.add('cap-on');
   keyboard.shift_key = true;
};

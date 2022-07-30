const inputBox = document.getElementById('input-box');

function init() {
  const keyboardCtr = document.createElement('div');
  keyboardCtr.classList.add('keyboard-ctr');
  keyboardCtr.setAttribute('id', 'k-ctr');
  keyboardCtr.style.transition = 'opacity 1s';
  const keyboardKeys = document.createElement('div');
  keyboardKeys.classList.add('keyboard-keys');

  inputBox.value = '';
  // render keyboard
  Object.entries(keyboard.key_layout).forEach((pair, i) => {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('key');
    const value = pair[1];
    const key = pair[0];

    const eve = new KeyboardEvent('keydown', { code: Object.keys(keyboard.key_layout)[i] });
    button.addEventListener('click', () => document.dispatchEvent(eve));

    if (i === 10 || i === 33 || i === 44) {
      return keyboardKeys.appendChild(button);
    }

    if (value.length > 2) {
      button.classList.add('key', 'multi-key');
      button.innerHTML = `<span>${value[0]}</span>
         <span>${value[1]}</span>
         <span>${value[2]}</span>`;
      return keyboardKeys.appendChild(button);
    }

    switch (key) {
      case 'Backspace':
        button.innerHTML = createCustomKey('backspace');
        break;
      case 'Shift':
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
  let key = e.code;
  const pair = keyboard.key_layout[key];
  prevState = inputBox.value;
  key = key === 'ShiftLeft' || key === 'ShiftRight' ? 'DefinedShift' : key;
console.log(key)
  switch (key) {
    case 'Backspace':
      inputBox.value = prevState.slice(0, -1);
      break;
    case 'Enter':
      inputBox.value += '\n';
      break;
    case 'Space':
      inputBox.value += ' ';
      break;
    case 'Shift':
      handleShiftKey();
      break;
    case 'DefinedShift':
      handleShiftKey();
    default:
      if (!pair) return;
      inputBox.value += keyboard.shift_key ? pair[1] : pair[2];
  }
};

const handleKeyUp = (e) => {
  if (!['ShiftLeft', 'ShiftRight'].includes(e.code)) return;
  handleShiftKey();
};

document.addEventListener('DOMContentLoaded', () => {
  init();

  const keyboardCtr = document.getElementById('k-ctr');
  const connect = document.getElementById('connect');
  const copy = document.getElementById('copy');
  const clear = document.getElementById('clear');

  document.addEventListener('keydown', (e) => clickFunc(e, handleKeyDown));
  document.addEventListener('keyup', (e) => clickFunc(e, handleKeyUp));

  connect.onclick = () => {
    const isConnected = keyboard.connected;
    isConnected ? inputBox.focus() : null;
    keyboardCtr.style.pointerEvents = isConnected ? 'none' : 'auto';
    inputBox.style.pointerEvents = isConnected ? 'auto' : 'none';
    keyboardCtr.style.opacity = isConnected ? '.5' : '1';
    connect.innerText = isConnected ? 'Disconnected' : 'Connected';
    keyboard.connected = !isConnected;
  };

  copy.onclick = () => {
    navigator.clipboard.writeText(inputBox.value);
    copy.innerText = 'Copied!!';
    setTimeout(() => {
      copy.innerText = 'Copy';
    }, 3000);
  };

  clear.onclick = () => {
    inputBox.value = '';
  };
});

const createCustomKey = (iconName) => `<i class="fas fa-${iconName}"></i>`;

const clickFunc = (e, handleEve) => {
  if (!keyboard.connected || e.code === null) return;
  handleEve(e);
};

const handleShiftKey = () => {
  const shift = document.getElementById('k-shift');
  keyboard.shift_key ? shift.classList.remove('cap-on') : shift.classList.add('cap-on');
  keyboard.shift_key = !keyboard.shift_key;
};

const keyboard = {
  key_layout: {
    Digit1: [1, '', '၁'],
    Digit2: [2, '', '၂'],
    Digit3: [3, '', '၃'],
    Digit4: [4, '', '၄'],
    Dight5: [5, '', '၅'],
    Dight6: [6, '', '၆'],
    Digit7: [7, '', '၇'],
    Digit8: [8, '', '၈'],
    Digit9: [9, '', '၉'],
    Digit0: [0, '', '၀'],
    'blank-1': [''],
    KeyQ: ['q', 'ဈ', 'ဆ'],
    KeyW: ['w', 'ဝ', 'တ'],
    KeyE: ['e', 'ဣ', 'န'],
    KeyR: ['r', '၎င်း', 'မ'],
    KeyT: ['t', 'ဤ', 'အ'],
    KeyY: ['y', '၌', 'ပ'],
    KeyU: ['u', 'ဥ', 'က'],
    KeyI: ['i', '၍', 'င'],
    KeyO: ['o', 'ဿ', 'သ'],
    KeyP: ['p', 'ဏ', 'စ'],
    Backspace: ['backspace'],
    Shift: ['shift'],
    KeyA: ['a', 'ဗ', 'ေ'],
    KeyS: ['s', 'ှ', 'ျ'],
    KeyD: ['d', 'ီ', 'ိ'],
    KeyF: ['f', '', '်'],
    KeyG: ['g', 'ါ', 'ွ'],
    KeyH: ['h', 'ံ', '့'],
    KeyJ: ['j', 'ဲ', 'ြ'],
    KeyK: ['k', 'ဒ', 'ု'],
    KeyL: ['l', 'ဓ', 'ူ'],
    enter: ['enter'],
    'blank-2': [''],
    KeyZ: ['z', 'ဇ', 'ဖ'],
    KeyX: ['x', 'ဌ', 'ထ'],
    KeyC: ['c', 'ဃ', 'ခ'],
    KeyV: ['v', 'ဠ', 'လ'],
    KeyB: ['b', 'ယ', 'ဘ'],
    KeyN: ['n', 'ဉ', 'ည'],
    KeyM: ['m', 'ဦ', 'ာ'],
    Comma: [',', '၊', '။'],
    Period: ['.', 'ရ', '္'],
    Backslash: ['\\', '', '?'],
    'blank-3': [''],
    BracketLeft: ['[', 'ဧ', 'ဟ'],
    Semicolon: [';', 'ဂ', 'း'],
    space: ['space'],
    Slash: ['/', 'ႅ', '၏'],
    BracketRight: [']', 'ဪ', 'ဩ'],
  },
  connected: true,
  shift_key: null,
  value: '',
};

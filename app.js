const keyboard = {
   key_layout : {
      eng_layout : [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "","q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "backspace","cap", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter","", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?","space"]
   },

   keyboard_binding: false,
   cap_lock : null,
   value : ""
}


function init() {
   const body = document.body;
   const inputBox = document.getElementById('input-box');
   const keyboardCtr = document.createElement("div");
   keyboardCtr.classList.add('keyboard-ctr');
   let keyboardKeys = document.createElement("div");
   keyboardKeys.classList.add("keyboard-keys");

   inputBox.value = '';
   inputBox.focus();
   inputBox.value.onchange = function () {
      console.log(this.selectionStart);
   }
   
   let keys = keyboard.key_layout.eng_layout;
   keys.forEach( key => {
      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.classList.add('key');

      switch(key) {
         case "backspace":
            button.innerHTML = createCustomKey('backspace');
            button.addEventListener('click', () => {
               keyboard.value = keyboard.value.slice(0, -1);
               inputBox.value = keyboard.value;
               inputBox.focus();
            });
            break;
         case "cap":
            button.innerHTML = createCustomKey('arrow-alt-circle-up');
            button.addEventListener('click', () => {
               button.classList.toggle('cap-on');
               keyboard.cap_lock = keyboard.cap_lock? null : true;
               inputBox.focus();
            });
            break;
         case "enter":
            button.innerHTML = createCustomKey('level-down-alt');
            button.firstElementChild.style.transform = "rotate(90deg)"
            button.addEventListener('click', () => {
               keyboard.value += '\n';
               inputBox.value = keyboard.value;
               inputBox.focus();
            })
            break;
         case "space":
            button.innerHTML = createCustomKey('ruler-horizontal');
            button.classList.add('key-common');
            button.addEventListener('click', () => {
               keyboard.value += ' ';
               inputBox.value = keyboard.value;
               inputBox.focus();
            });
            break;
         default:
            button.innerHTML = key;
            button.addEventListener('click', () => {
               keyboard.value += keyboard.cap_lock ?  key.toUpperCase() : key;
               inputBox.value = keyboard.value;
               inputBox.focus();
            });
      }
      keyboardKeys.appendChild(button);
   });
   keyboardCtr.appendChild(keyboardKeys);
   body.appendChild(keyboardCtr);
}

function createCustomKey(iconName) {
   return `<i class="fas fa-${iconName}"></i>`;
}

document.addEventListener('DOMContentLoaded', () => {
   init();
})

document.onkeydown = function(e) {
   console.log(e.key);
}
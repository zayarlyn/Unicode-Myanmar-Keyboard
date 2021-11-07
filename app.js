const keyboard = {
   key_layout : {
      eng_layout : [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "","q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "backspace","cap", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter","", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?","space"]
   },

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

   let keys = keyboard.key_layout.eng_layout;
   keys.forEach( key => {
      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.classList.add('key');

      switch(key) {
         case "backspace":
            button.innerHTML = createCustomKey('backspace');
            break;
         case "cap":
            button.innerHTML = createCustomKey('arrow-alt-circle-up');
            break;
         case "enter":
            button.innerHTML = createCustomKey('level-down-alt');
            button.firstElementChild.style.transform = "rotate(90deg)"
            break;
         case "space":
            button.innerHTML = createCustomKey('ruler-horizontal');
            button.classList.add('key-common')
            break;
         default:
            button.innerHTML = key;
            button.addEventListener('click', () => {
               keyboard.value += key;
               inputBox.value = keyboard.value;
            });
      }
      keyboardKeys.appendChild(button);
   });
   keyboardCtr.appendChild(keyboardKeys);
   body.appendChild(keyboardCtr);
}

function createCustomKey(iconName) {
   return `<i class="fas fa-${iconName}"></i>`
}

function createKey() {

}

init();


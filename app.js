const keyboard = {
   key_layout : {
      eng_layout : [ ["1"], ["2"], ["3"], ["4"], ["5"], ["6"], ["7"], ["8"], ["9"], ["0"], [""], ["q", 'ဈ', 'ဆ'], ["w", 'ဝ', 'တ'], ["e", 'ဣ', 'န'], ["r", '၎င်း', 'မ'], ["t", 'ဤ','အ'], ["y", '၌', 'ပ'], ["u", 'ဥ', 'က'], ["i", '၍', 'င'], ["o", 'ဿ','သ'], ["p", 'ဏ','စ'] ,["backspace"],["cap"], ["a", 'ဗ', 'ေ'], ["s",'ှ','ျ'], ["d",'ီ', 'ိ'], ["f","", '်'], ["g", 'ါ', 'ွ'], ["h", 'ံ', '့'], ["j", 'ဲ', 'ြ'], ["k", 'ဒ', "ု"], ["l", 'ဓ', 'ူ'], ["enter"], [""], ["z", 'ဇ', 'ဖ'], ["x", 'ဌ', 'ထ'], ["c", 'ဃ', 'ခ'], ["v", 'ဠ', 'လ'], ["b", 'ယ', 'ဘ'], ["n", 'ဉ', 'ည'], ["m", 'ဦ',  'ာ'], [",", '၊', '။'], [".", "ရ", "္"], ["?"], [""], ["+",'ဧ','ဟ'], ["+", 'ဂ', 'း'], ["space"], ["+","ႅ", '၏'], ["+",'ဪ',"ဩ"]]
   },

   keyboard_binding: false,
   cap_lock : null,
   mm_f : true,
   value : ""
}

function init() {
   const inputBox = document.getElementById('input-box');
   const keyboardCtr = document.createElement("div");
   keyboardCtr.classList.add('keyboard-ctr');
   let keyboardKeys = document.createElement("div");
   keyboardKeys.classList.add("keyboard-keys");

   inputBox.value = '';
   inputBox.focus();
   
   let keys = keyboard.key_layout.eng_layout;
   keys.forEach( key=> {
      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.classList.add('key');

      if (key.length == 1) {
         switch(key[0]) {
            case "backspace":
               button.innerHTML = createCustomKey('backspace');
               button.addEventListener('click', () => {
                  keyboard.value = keyboard.value.slice(0, -1);
                  updateInput(inputBox, keyboard.value);
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
                  updateInput(inputBox, keyboard.value);
               })
               break;
            case "space":
               button.innerHTML = createCustomKey('ruler-horizontal');
               button.classList.add('key-common');
               button.addEventListener('click', () => {
                  keyboard.value += ' ';
                  updateInput(inputBox, keyboard.value);
               });
               break;
            default:
               button.innerHTML = key[0];
               button.addEventListener('click', () => {
                  keyboard.value += keyboard.cap_lock ?  key[0].toUpperCase() : key[0];
                  updateInput(inputBox, keyboard.value);
               });
         }
         keyboardKeys.appendChild(button);

      }    
      else if (key.length == 3 && key[0] != '&') {
         button.classList.add('key', 'multi-key');
         button.innerHTML = `<span>${key[0]}</span>
                             <span>${key[1]}</span>
                             <span>${key[2]}</span>`;

         button.addEventListener('click', () => {
            keyboard.value += keyboard.cap_lock && keyboard.mm_f?  key[1] : key[2];
            updateInput(inputBox, keyboard.value);
         });
      
         keyboardKeys.appendChild(button);
      }  
   });
   keyboardCtr.appendChild(keyboardKeys);
   document.body.appendChild(keyboardCtr);
}

const createCustomKey = (iconName) => `<i class="fas fa-${iconName}"></i>`;

const updateInput = (inp, val) => {
   inp.value = val;
   inp.focus();
} 

document.addEventListener('DOMContentLoaded', () => {
   init();
})


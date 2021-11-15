const keyboard = {
   key_layout : {
      eng_layout : [ ["1"], ["2"], ["3"], ["4"], ["5"], ["6"], ["7"], ["8"], ["9"], ["0"], [""], ["q", 'ဈ', 'ဆ'], ["w", 'ဝ', 'တ'], ["e", 'ဣ', 'န'], ["r", '၎င်း', 'မ'], ["t", 'ဤ','အ'], ["y", '၌', 'ပ'], ["u", 'ဥ', 'က'], ["i", '၍', 'င'], ["o", 'ဿ','သ'], ["p", 'ဏ','စ'] ,["backspace"],["shift"], ["a", 'ဗ', 'ေ'], ["s",'ှ','ျ'], ["d",'ီ', 'ိ'], ["f","", '်'], ["g", 'ါ', 'ွ'], ["h", 'ံ', '့'], ["j", 'ဲ', 'ြ'], ["k", 'ဒ', "ု"], ["l", 'ဓ', 'ူ'], ["enter"], [""], ["z", 'ဇ', 'ဖ'], ["x", 'ဌ', 'ထ'], ["c", 'ဃ', 'ခ'], ["v", 'ဠ', 'လ'], ["b", 'ယ', 'ဘ'], ["n", 'ဉ', 'ည'], ["m", 'ဦ',  'ာ'], [",", '၊', '။'], [".", "ရ", "္"], ["?"], [""], ["[",'ဧ','ဟ'], [";", 'ဂ', 'း'], ["space"], ["\\","ႅ", '၏'], ["]",'ဪ',"ဩ"]]
   },

   keyboard_binding: false,
   shift_key : null,
   value : ""
}

function init() {
   const inputBox = document.getElementById('input-box');
   const keyboardCtr = document.createElement("div");
   keyboardCtr.classList.add('keyboard-ctr');
   let keyboardKeys = document.createElement("div");
   keyboardKeys.classList.add("keyboard-keys");

   inputBox.value = '';
   
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
                  inputBox.value = inputBox.value.slice(0, -1);
                  keyboard.shift_key = null;
               });
               break;
            case "shift":
               button.innerHTML = createCustomKey('arrow-alt-circle-up');
               button.addEventListener('click', () => {
                  keyboard.shift_key = keyboard.shift_key? null : true;
                  button.classList.toggle('cap-on');
               });
               break;
            case "enter":
               button.innerHTML = createCustomKey('level-down-alt');
               button.firstElementChild.style.transform = "rotate(90deg)"
               button.addEventListener('click', () => {
                  inputBox.value += '\n';
                  keyboard.shift_key = null;
               })
               break;
            case "space":
               button.innerHTML = createCustomKey('ruler-horizontal');
               button.classList.add('key-common');
               button.addEventListener('click', () => {
                  inputBox.value += ' ';
                  keyboard.shift_key = null;
               });
               break;
            default:
               button.innerText = key[0];
               button.addEventListener('click', () => {
                  keyboard.value += keyboard.shift_key ?  key[0].toUpperCase() : key[0];
                  keyboard.shift_key = null;
                  document.getElementById('k-shift').classList.remove('cap-on');
                  inputBox.value += key[0];
               });
         }
      }    
      else {
         button.classList.add('key', 'multi-key');
         button.innerHTML = `<span>${key[0]}</span>
         <span>${key[1]}</span>
         <span>${key[2]}</span>`;
         
         button.addEventListener('click', () => {
            inputBox.value += keyboard.shift_key? key[1] : key[2];
            keyboard.shift_key = null;
            document.getElementById('k-shift').classList.remove('cap-on')
         });
      }  
      button.setAttribute('id', `k-${key[0]}`);
      keyboardKeys.appendChild(button);
   });
   keyboardCtr.appendChild(keyboardKeys);
   document.body.appendChild(keyboardCtr);
}

const createCustomKey = (iconName) => `<i class="fas fa-${iconName}"></i>`;

document.addEventListener('DOMContentLoaded', () => {
   init();
})

document.addEventListener('keydown', e => {
   console.log(e.key);
   const key = document.getElementById(`k-${e.key.toLowerCase()}`);
   if (key !== null)
      key.click();
});
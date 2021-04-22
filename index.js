const isValidHex = (hex) => {
    if(!hex) return false;

    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}

const inputHex = document.getElementById('inputHEX');
const inputColor = document.querySelector('.input-color');

inputHex.addEventListener('keyup', ()=>{
  const hex = inputHex.value;

  if(!isValidHex(hex)) return;

  const strippedHex = hex.replace('#', '');

 inputColor.style.backgroundColor = "#" + strippedHex;
})

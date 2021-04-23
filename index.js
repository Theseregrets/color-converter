const inputHex = document.getElementById('inputHEX');
const inputColor = document.querySelector('.input-color');
const sliderText = document.getElementById('sliderText');
const slider = document.getElementById('slider');
const colorTxt = document.querySelector('.output-color-txt');
const outputColor = document.querySelector('.output-color');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');
//checking if hex code is valid

toggleBtn.addEventListener('click', () => {
  if (toggleBtn.classList.contains('toggled')) {
    toggleBtn.classList.remove('toggled');
    lightenText.classList.remove('unselected');
    darkenText.classList.add('unselected');
  } else {
    toggleBtn.classList.add('toggled');
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');
  }
  reset()
})


const isValidHex = (hex) => {
  if (!hex) return false;

  const strippedHex = hex.replace('#', '');
  return strippedHex.length === 3 || strippedHex.length === 6;
}

//event listener added to change div color
inputHex.addEventListener('keyup', () => {
  const hex = inputHex.value;

  if (!isValidHex(hex)) return;

  let strippedHex = hex.replace('#', '');

  inputColor.style.backgroundColor = "#" + strippedHex;

  reset()
})
//converting hex to rgb
const convertHexToRgb = (hex) => {
  if (!isValidHex(hex)) return null;

  let strippedHex = hex.replace('#', '');
  if (strippedHex.length === 3) {
    strippedHex = strippedHex[0] + strippedHex[0] +
      strippedHex[1] + strippedHex[1] +
      strippedHex[2] + strippedHex[2]
  }

  // parsing rgb

  let r = parseInt(strippedHex.substring(0, 2), 16);
  let g = parseInt(strippedHex.substring(2, 4), 16);
  let b = parseInt(strippedHex.substring(4, 6), 16);

  return {
    r,
    g,
    b
  }

}

//converting rgb to hex
const convertRgbToHex = (r, g, b) => {
  let firstNum = ("0" + r.toString(16)).slice(-2);
  let secondNum = ("0" + g.toString(16)).slice(-2);
  let thirdNum = ("0" + b.toString(16)).slice(-2);

  let convertedHex = '#' + firstNum + secondNum + thirdNum;

  return convertedHex

  console.log(convertedHex);
}

//slider number update

//conditioning such that the range stays within (0, 255)
const increasedAmount = (hex, amount) => {
  return Math.min(255, Math.max(0, hex + amount));

}

//alternating color
const alteredColor = (hex, percent) => {
  const {
    r,
    g,
    b
  } = convertHexToRgb(hex);

  const amount = Math.floor((percent / 100) * 255);

  let newR = increasedAmount(r, amount);
  let newG = increasedAmount(g, amount);
  let newB = increasedAmount(b, amount);

  const alteredColor = convertRgbToHex(newR, newG, newB)
  return alteredColor;
}

slider.addEventListener('input', () => {

  if (!isValidHex(inputHex.value)) return;

  sliderText.textContent = slider.value + "%";

  const addValue = toggleBtn.classList.contains('toggled') ? -slider.value : slider.value;
  const newColor = alteredColor(inputHex.value, addValue);
  outputColor.style.backgroundColor = newColor;
  colorTxt.textContent = newColor;



})

const reset = () => {
  slider.value = 0;
  sliderText.textContent = '0%';
  const hex = inputHex.value;
  if (!isValidHex(hex)) return;
  let strippedHex = hex.replace('#', '');
  outputColor.style.backgroundColor = "#" + strippedHex;

  colorTxt.textContent = inputHex.value;
}

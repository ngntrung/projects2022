// Selectors

const sentence= document.querySelector('.base-sentence');
const display = document.querySelector('.display');
const textColor = document.querySelector('.base-color');
const textSizeInputs = document.querySelectorAll('.base-size');
const background = document.querySelector('.base-background');
const colorInputs = document.querySelectorAll('input[type=color]');
const range = document.querySelector('.size-range');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const sizeValue = document.querySelector('.size-value');
const result2A = document.querySelector('.result2a');
const result3A = document.querySelector('.result3a');
const resultRatio = document.querySelector('.result-ratio');
const resetBtn = document.querySelector('.reset-btn');
const dropdownBtn = document.querySelector('.dropdown-button');
const dropdownList = document.querySelector('.size-dropdown');


// Pre-filled data
display.innerHTML=sentence.value;
defaultData = {
  text: 'Sometimes your joy is the source of your smile, but sometimes your smile can be the source of your joy',
  textColor: '#ffffff',
  bgColor: '#1b1b1b',
  fontSize: '16px',
}

//Text Update Function



function textDisplay (e) {
  display.innerHTML=sentence.value;
}

// Set Property Function

function changeProperty (e){
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  const textSize = sizeValue.innerHTML * 72 / 96;
  const contrastResult = contrastChecker(textColor.value, background.value);
  resultRatio.innerHTML = `<strong>${Math.round((1 / contrastResult.ratio))}</strong> : 1`;

  if (textSize < 18) {
    result2A.innerHTML = contrastResult.small2A;
    result2A.style.color = contrastResult.small2A == 'PASS' ? 'green': 'red';

    result3A.innerHTML = contrastResult.small3A;
    result3A.style.color = contrastResult.small3A == 'PASS' ? 'green': 'red';
  } else {
    result2A.innerHTML = contrastResult.large2A;
    result2A.style.color = contrastResult.large2A == 'PASS' ? 'green': 'red';

    result3A.innerHTML = contrastResult.large3A;
    result3A.style.color = contrastResult.large3A == 'PASS' ? 'green': 'red';
  }
}


// Change Size Function


// Reset Function

resetBtn.addEventListener('click', reset);
function reset (){
  sentence.value=defaultData.text;
  textColor.value = defaultData.textColor;
  background.value = defaultData.bgColor;
  sizeValue.value = defaultData.fontSize;
  textDisplay();
  resultRatio.innerHTML = '';
  result2A.innerHTML = '';
  result3A.innerHTML = '';

  document.documentElement.style.setProperty('--base-color', defaultData.textColor);
  document.documentElement.style.setProperty('--base-background', defaultData.bgColor);
  document.documentElement.style.setProperty('--base-size', defaultData.fontSize);
}

// hexToRGB function by Tim Down - https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb/5624139#5624139
function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Luminate Calculation function
function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928
          ? v / 12.92
          : Math.pow( (v + 0.055) / 1.055, 2.4 );
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Contrast Function - API provided by webaim.org
function contrastChecker (textColor, bgColor){
  const textColorLumi = luminance(hexToRgb(textColor).r, hexToRgb(textColor).g, hexToRgb(textColor).b);
  const bgColorLumi = luminance(hexToRgb(bgColor).r, hexToRgb(bgColor).g, hexToRgb(bgColor).b);
  const ratio = textColorLumi > bgColorLumi ? ((bgColorLumi + 0.05) / (textColorLumi + 0.05)) 
                : ((textColorLumi + 0.05) / (bgColorLumi + 0.05));
  const results = {
    large2A: ratio < 1/3 ? 'PASS' : 'FAIL',
    small2A: ratio < 1/4.5 ? 'PASS' : 'FAIL',
    large3A: ratio < 1/4.5 ? 'PASS' : 'FAIL',
    small3A: ratio < 1/7 ? 'PASS' : 'FAIL',
    ratio: ratio
  }
  return results;
}



// Set Event
sentence.addEventListener("keyup", textDisplay);
colorInputs.forEach(input => input.addEventListener('change', changeProperty));
colorInputs.forEach(input => input.addEventListener('mousemove', changeProperty));


textSizeInputs.forEach(input => input.addEventListener('change', changeProperty));

// Expand Text Size Dropdown
dropdownBtn.addEventListener('click', function (){
  const dropdownState = dropdownList.style.display;
  dropdownList.style.display = dropdownState == ''? 'block' : '';
}) 

// Dropdown Item Event
dropdownItems.forEach(item => item. addEventListener('click', function(){
  sizeValue.innerHTML = this.dataset.value + ' px';
  document.documentElement.style.setProperty('--base-size', this.dataset.value + 'px');
  dropdownList.style.display='none';
  range.value=this.dataset.value;
}));

range.addEventListener('change', function(){
  sizeValue.innerHTML = this.value + ' px';
})
range.addEventListener('mousemove', function(){
  sizeValue.innerHTML = this.value + ' px';
})


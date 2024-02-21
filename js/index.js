const btn = document.getElementById('btn');
const gradientBtn = document.getElementById('gradientBtn');
const gradientCard = document.getElementById('item4');
let row = document.getElementById('row');

let array = [1, 2, 3];
let selectedColor = [];

function generateItem() {
  // itemList.push(row);
  // console.log(itemList)
  if (array.length <= 3) {
    const colorBar = document.createElement('div');
    const colorName = document.createElement('div');
    const textField = document.createElement('span');
    const item = document.createElement('div');

    row.appendChild(item);
    item.appendChild(colorBar);
    item.appendChild(colorBar);
    item.appendChild(colorName);
    // colorName.appendChild(textFields);

    item.setAttribute('class', 'item');
    colorBar.setAttribute('class', 'color-bar');
    colorName.setAttribute('class', 'color-name');
    textField.setAttribute('class', 'color');
    // textField.innerText = finalColor[0];
  } else {
    alert('card limit exceeded');
  }
  // colorImp();
}

const generateRandomColor = () => {
  const colorCode = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return colorCode;
};

const generateGradient = (selectedColor) => {
  console.log(selectedColor, 'gradientBtn');

  if (selectedColor.length < 2) {
    alert('Select atleast two colors to generate gradient..');
    return;
  }

  if (selectedColor.length === 2) {
    color.innerHTML = `linear-gradient(to right,${selectedColor[0]},${selectedColor[1]})`;
    gradientCard.children[0].style.background = `linear-gradient(to right,${selectedColor[0]},${selectedColor[1]})`;
  } else {
    color.innerHTML = `linear-gradient(to right,${selectedColor[0]},${selectedColor[1]},${selectedColor[2]})`;
    gradientCard.children[0].style.background = `linear-gradient(to right,${selectedColor[0]},${selectedColor[1]},${selectedColor[2]}`;

    // Clear the selectedColor array
    selectedColor.length = 0;
  }
};

function hexToRgb(hex) {
  let x = [];
  hex = hex.replace('#', '');
  if (hex.length != 6) {
    alert('please check hex value..');
    return;
  }
  x.push(parseInt(hex.slice(0, 2), 16));
  x.push(parseInt(hex.slice(2, 4), 16));
  x.push(parseInt(hex.slice(4, 6), 16));
  return 'rgb(' + x.toString() + ')';
}

function hexToHsl(hex) {
  // Remove the # if it exists
  hex = hex.replace(/#/g, '');

  // Convert the hex values to RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;

  let cmin = Math.min(r, g, b);
  let cmax = Math.max(r, g, b);
  let delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = (cmax + cmin) / 2;

  if (delta > 0) {
    if (cmax === r) {
      h = ((g - b) / delta) % 6;
    } else if (cmax === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);

    if (h < 0) {
      h += 360;
    }

    s = delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
  }

  h = +((h * 100) / 360).toFixed(1);

  return `hsl(${h}, ${s}%, ${l * 100}%)`;
}

btn.addEventListener('click', () => {
  array.forEach((value) => {
    const item = document.getElementById(`item${value}`);
    const color = document.getElementById(`color${value}`);
    let randomColor = generateRandomColor();

    color.innerHTML = randomColor;
    item.children[0].style.background = randomColor;

    selectedColor.push(randomColor);
  });

  // selectedColor.pop();
  generateGradient(selectedColor);
});

array.forEach((value) => {
  const item = document.getElementById(`item${value}`);
  const copyBtn = document.getElementById(`copyBtn${value}`);
  // let colorValue = document.getElementById(`color${value}`).innerHTML;
  const colorType = document.getElementById(`colorType${value}`);
  console.log(item, copyBtn, colorType);

  generateItem();

  item.addEventListener('dblclick', (e) => {
    e.preventDefault();

    if (selectedColor.includes(colorValue)) {
      alert('Already selected color..');
      return;
    }

    selectedColor.push(colorValue);
    console.log(selectedColor, 'gradientBtn');

    alert('Color selected..');
    generateGradient(selectedColor);
  });

  colorType.addEventListener('change', (e) => {
    switch (e.target.value) {
      case 'rgb':
        document.getElementById(`color${value}`).innerHTML =
          hexToRgb(colorValue);
        document.body.style.background = hexToRgb(colorValue);
        break;
      case 'hsl':
        document.getElementById(`color${value}`).innerHTML =
          hexToHsl(colorValue);
        document.body.style.background = hexToRgb(colorValue);
        break;
      default:
        document.getElementById(`color${value}`).innerHTML = colorValue;
        break;
    }
  });

  copyBtn.addEventListener('click', () => {
    let colorValue = document.getElementById(`color${value}`).innerHTML;
    try {
      navigator.clipboard.writeText(colorValue);
      document.getElementById(`color${value}`).style.backgroundColor =
        '#24264d';
      document.getElementById(`color${value}`).style.color = 'white';

      setTimeout(() => {
        document.getElementById(`color${value}`).style.backgroundColor = '';
        document.getElementById(`color${value}`).style.color = 'black';
      }, 5000);

      alert('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  });
});

// gradientBtn.addEventListener('click', () => {
//   generateGradient(selectedColor);
// });

import dataJson from './pieChart.json'

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomColors(numColors) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(getRandomColor());
  }
  return colors;
}

export const data = {
  labels: dataJson.map(d => d.year),
  datasets: [
    {
      backgroundColor: getRandomColors(dataJson.length),
      data: dataJson.map(d => d.numInstalls)
    }
  ]
}

export const options = {
  responsive: true,
  maintainAspectRatio: false
}

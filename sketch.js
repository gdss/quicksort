let arr = [];
const w = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  arr = new Array(floor(width / w));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = random(height);
  }

  quicksort(arr, 0, arr.length - 1);
}

function draw() {
  background(0);

  noStroke();
  fill(255);
  for (let i = 0; i < arr.length; i++) {
    rect(i * w, height - arr[i], w, arr[i]);
  }

}

async function quicksort(arr, low, high) {
  if (low < high) {
    let p = await partition(arr, low, high);
    await Promise.all([
      quicksort(arr, low, p - 1),
      quicksort(arr, p + 1, high)
    ]);
  }
}

async function partition(arr, low, high) {
  let pivot = arr[low];
  let i = low;
  let j = high;
  while (i <= j) {
    while (i <= high && arr[i] <= pivot) {
      i++;
    }
    while (j > low && arr[j] > pivot) {
      j--;
    }
    if (i < j) {
      await swap(arr, i, j);
      i++;
      j--;
    }
  }
  await swap(arr, low, j);
  return j;
}

async function swap(arr, i, j) {
  await sleep(20);
  let aux = arr[i];
  arr[i] = arr[j];
  arr[j] = aux;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const shuffleArray = (arr) => {
  for (const element of arr) {
    // arr[index] = element
    const index = arr.indexOf(element);
    const randomIndex = Math.floor(Math.random() * arr.length);

    const temp = element;
    arr[index] = arr[randomIndex];
    arr[randomIndex] = temp;
  }

  return arr;
};

module.exports = shuffleArray;

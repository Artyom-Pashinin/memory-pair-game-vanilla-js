function shuffleArrayRandomly(arr) {
  let tempArr = [...arr];
  return tempArr.sort(() => Math.random() - 0.5);
}
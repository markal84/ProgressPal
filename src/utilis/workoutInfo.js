function totalWeight(exerciseArr) {
  return exerciseArr.reduce(
    (sum, exercise) => sum + exercise[0] * exercise[1] * exercise[2],
    0
  )
}

export { totalWeight }

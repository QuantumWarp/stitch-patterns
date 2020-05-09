class PatternHelper {
  static createFilledPattern(dimensions, color) {
    const pattern = [];
    for (let x = 0; x < dimensions.width; x += 1) {
      for (let y = 0; y < dimensions.height; y += 1) {
        pattern.push({ x, y, color });
      }
    }
    return pattern;
  }

  static getDimensionsFromSortedPatten(sortedPattern) {
    const firstPoint = sortedPattern[0];
    const lastPoint = sortedPattern[sortedPattern.length - 1];
    return {
      width: lastPoint.x - firstPoint.x + 1,
      height: lastPoint.y - firstPoint.y + 1,
    };
  }
}

export default PatternHelper;

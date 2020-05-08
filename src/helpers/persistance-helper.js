class PersistanceHelper {
  static createSaveInfo(getters) {
    return {
      saveDate: new Date(),
      patternDetails: getters.patternDetails,
      compressedPattern: PersistanceHelper.compressPattern(getters.pattern),
    };
  }

  static createIndexInfo(getters) {
    return {
      ...getters.patternDetails,
      saveDate: new Date(),
    };
  }

  static compressPattern(pattern) {
    return pattern;
  }
}

export default PersistanceHelper;

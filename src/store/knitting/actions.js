export default {
  updateTime(time) {
    if (this.time === 0) {
      this.startStitch = this.selectedStitch;
    }
    this.time = time;
  },
  updateKnitSettings(settingsUpdate) {
    this.knitSettings = { ...this.knitSettings, ...settingsUpdate };
  },
  resetKnitSession({ resetTime } = { resetTime: true }) {
    const firstStitch = this.knitPattern[0][0];
    this.startStitch = firstStitch;
    this.selectedStitchState = firstStitch;
    if (resetTime) {
      this.time = 0;
    }
  },
  selectStitch(stitch) {
    this.selectedStitchState = stitch;
  },
};

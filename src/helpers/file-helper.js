/* eslint-disable class-methods-use-this */
class FileHelper {
  async importRaw(e) {
    return new Promise((resolve) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        resolve(evt.target.result);
      };
      reader.readAsText(file);
    });
  }

  exportToKnit(name, pattern) {
    let text = `-------- ${name} --------\r\n\r\n`;
    const height = Math.max(...pattern.map((point) => point.y)) + 1;

    for (let y = 0; y < height; y += 1) {
      text += this.exportToKnitRow(
        y,
        pattern.filter((point) => point.y === (height - 1 - y)),
        y % 2,
      );
    }

    this.download(`${name}.txt`, text);
  }

  exportToKnitRow(row, points, reversed) {
    let text = `-------- Row ${row + 1} --------${reversed ? ' (Reversed)' : ''}\r\n`;
    let count = 1;
    const r = reversed ? -1 : 1;
    points
      .sort((a, b) => (a.x > b.x ? r : -r))
      .forEach((point, index, self) => {
        const nextPoint = self[index + 1];
        const notSame = !nextPoint || point.color !== nextPoint.color;
        if (notSame) {
          text += `Knit ${count * 2}: ${this.colorString(point.color)}\r\n`;
          count = 1;
        } else {
          count += 1;
        }
      });

    return `${text}\r\n`;
  }

  download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  colorString(color) {
    switch (color) {
      case '#FFFFFF': return 'White';
      case '#000000': return 'Black';
      default: return color;
    }
  }
}

export default new FileHelper();

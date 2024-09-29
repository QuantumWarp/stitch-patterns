class FileHelper {
  static async importRaw(e) {
    return new Promise((resolve) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        resolve(evt.target.result);
      };
      reader.readAsText(file);
    });
  }

  static download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}

export default FileHelper;

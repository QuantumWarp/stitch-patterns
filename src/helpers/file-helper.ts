export default class FileHelper {
  static async importRaw(e: InputEvent) {
    return new Promise((resolve) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt: ProgressEvent<FileReader>) => {
        resolve(evt.target?.result);
      };
      reader.readAsText(file);
    });
  }

  static download(filename: string, text: string) {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}

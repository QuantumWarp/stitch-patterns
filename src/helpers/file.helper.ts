export class FileHelper {
  static async importRaw(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (evt: ProgressEvent<FileReader>) => {
        resolve(evt.target?.result as string);
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

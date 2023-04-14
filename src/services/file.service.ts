import { api } from "src/boot/axios";

export class FileService {
  private static b64toBlob (b64Data: string, contentType = '', sliceSize = 512): Blob {
    console.log(contentType)
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  static async getFile(salt: string, type = 'image/png'): Promise<File> {
    const file = await api.get(
      `/cdn/get/${salt}`, 
      {
        baseURL: 'http://localhost:8080',
      }
    ).then((res) => res.data)

    const myBlob = this.b64toBlob(file, type);
    const myFile = new File([myBlob], 'Файл', { type });
    return myFile;
  }

  static async getFileBase64(salt: string): Promise<string> {
    return await api.get(
      `/cdn/get/${salt}`, 
      {
        baseURL: 'http://localhost:8080',
      }
    ).then((res) => res.data)
  }

  static async uploadFile(file: Array<File>): Promise<string> {
    const formData = new FormData();
    const fileToUpload = file[0];
    formData.append('content', fileToUpload);

    const salt = await api.post(
      '/cdn/upload', 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        baseURL: 'http://localhost:8080',
      }
    ).then((res) => res.data.salt)

    return salt;
  }
}
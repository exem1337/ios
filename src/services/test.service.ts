import { api } from "src/boot/axios";
import { ITestResponse } from "src/models/test.model";
import { FileService } from "./file.service";
import { Router } from "vue-router";
import { Notify } from "quasar";

export class TestService {
  static async getTest(key: number, router: Router): Promise<ITestResponse> {
    const test = await api.get(`/getTest/${key}`).then((res) => res.data?.Data)
    test.Questions = await Promise.all(test.Questions.map(async (question) => {
      const answer = await Promise.all(question.Answer?.map(async (ans) => {
        let file = null;
        if (ans.Img?.File) {
          file = await FileService.getFileBase64(ans.Img.File)
        }

        return {
          ...ans,
          Img: file,
        }
      }))
      
      let Img = null;

      if (question.Img?.File) {
        Img = await FileService.getFileBase64(question.Img.File);
      }
      
      return {
        ...question,
        Img,
        Answer: answer
      }
    }))
    
    return test;
  }
}
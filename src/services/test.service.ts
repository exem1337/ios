import { api } from 'src/boot/axios';
import { ITestResponse } from 'src/models/test.model';
import { FileService } from './file.service';
import { IEduTime } from 'src/models/fuzzy.model';

export class TestService {
  static async getTest(key: number): Promise<ITestResponse> {
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

  static getEduTimeDelta(edu: Array<IEduTime>) {
    const sum = edu.reduce((acc, val) => acc += val.Time, 0);
    const res = 50 * sum / 3600;
    return res > 100 ? 100 : res;
  }

  static getAnswerTimeDelta(time: Array<number>) {
    const sum = time.reduce((acc, val) => acc += val, 0);
    const res = 50 * sum / 300;
    return res > 100 ? 100 : res;
  }
}
export class TakeQuizDto {
  answers: {
    questionId: number;
    selected: string;
  }[];
}

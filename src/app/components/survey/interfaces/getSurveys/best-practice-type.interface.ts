import { BestPracticeTypeTranslation } from './best-practice-type-translation.interface';

export interface BestPracticeType {
  typeBestPracticeId: number;
  typeBestPracticeStatus: boolean;
  typeBestPracticeTranslation: BestPracticeTypeTranslation;
}

import { Result } from '../../visit/interfaces/getSurveys/result.interface';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';

export interface HistoryState {
  history: GetResult | null;
  results: Result[];
  layout: {
    selectedResult: number | null;
    selectedCategory: number | null;
  };
}

export const historyInitialState: HistoryState = {
  history: null,
  results: [],
  layout: {
    selectedResult: null,
    selectedCategory: null,
  },
};

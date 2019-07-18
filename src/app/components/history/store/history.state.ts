import { Result } from '../../visit/interfaces/getSurveys/result.interface';

export interface HistoryState {
  history: Result[] | null;
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

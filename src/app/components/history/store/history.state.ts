import { GetResult } from '../../survey/interfaces/getResultInterface/getResult.interface';
import { HistorySearch } from '../interfaces/history-search.interface';
import { Result } from '../../survey/interfaces/results/result.interface';

export interface HistoryState {
  history: GetResult | null;
  results: Result[];
  layout: {
    selectedResult: number | null;
    selectedCategory: number | null;
  };
  search: HistorySearch;
}

export const historyInitialState: HistoryState = {
  history: null,
  results: [],
  layout: {
    selectedResult: null,
    selectedCategory: null,
  },
  search: null,
};

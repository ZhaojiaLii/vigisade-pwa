import { Result } from '../../components/survey/interfaces/results/result.interface';

export interface BufferState {
  surveyResults: Result[];
}

export const initialBufferState: BufferState = {
  surveyResults: [],
};

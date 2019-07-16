import { createFeatureSelector } from '@ngrx/store';
import { DangerousState } from './dangerous.states';

export const getDangerousTypeState = createFeatureSelector<DangerousState>('dangerous');


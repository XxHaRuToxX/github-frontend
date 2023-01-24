import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useCustomDispatch: () => AppDispatch = useDispatch;
export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;
import { type TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from './rootReducer'

// Hook yang diketik untuk Redux selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../stores/rootReducer";
import { toggleTheme } from "../features/themeSlice";


export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const switchTheme = () => {
    dispatch(toggleTheme())
  }

  return {theme, switchTheme}
}
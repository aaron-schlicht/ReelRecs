import { createSlice } from "@reduxjs/toolkit";
import { Movie, FullMovie, WatchProvider } from "../constants";

interface InitialType {
  selectedMovie: Movie | null;
  similarMovies: FullMovie[];
  selectedServices: WatchProvider[];
  focus: "home" | "lucky" | "search";
}

const initialState: InitialType = {
  selectedMovie: null,
  similarMovies: [],
  selectedServices: [],
  focus: "home",
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    updateSelectedMovie: (state, action) => {
      return { ...state, selectedMovie: action.payload };
    },
    updateSimilarMovies: (state, action) => {
      return { ...state, similarMovies: action.payload };
    },
    updateSelectedServices: (state, action) => {
      if (!state.selectedServices.includes(action.payload)) {
        return {
          ...state,
          selectedServices: [...state.selectedServices, action.payload],
        };
      } else {
        return {
          ...state,
          selectedServices: [
            ...state.selectedServices.filter(
              (p) => p.provider_id !== action.payload.provider_id
            ),
          ],
        };
      }
    },
    updateFocus: (state, action) => {
      return { ...state, focus: action.payload };
    },
    removeSelectedMovie: (state) => {
      return { ...state, selectedMovie: null };
    },
    onNewSearch: (state) => {
      return (state = initialState);
    },
  },
});

export const {
  updateSelectedMovie,
  updateSimilarMovies,
  updateSelectedServices,
  updateFocus,
  removeSelectedMovie,
  onNewSearch,
} = movieSlice.actions;

export default movieSlice.reducer;

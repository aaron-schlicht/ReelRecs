import { createSlice } from "@reduxjs/toolkit";
import {
  Movie,
  FullMovie,
  WatchProvider,
  Genre,
  Genres,
  Keyword,
  KeywordMap,
} from "../constants";

interface InitialType {
  step: number;
  genres: Genre[];
  keywords: Keyword[];
  activeList: { name: string; id: number }[];
}

const initialState: InitialType = {
  step: 0,
  genres: [],
  keywords: [],
  activeList: [
    ...Object.values(Genres).sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }),
  ],
};

export const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    updateStep: (state, action) => {
      state.step = action.payload;
    },
    updateGenre: (state, action) => {
      if (state.genres.filter((g) => g.id === action.payload.id).length === 0) {
        let index = state.activeList.findIndex(
          (val) => val.id === action.payload.id
        );
        let keys = KeywordMap[action.payload.id].map((k) => {
          return { id: k.id, name: k.name };
        });
        state.genres = [...state.genres, action.payload];
        if (index === 0) {
          state.activeList = [
            state.activeList[0],
            ...keys,
            ...state.activeList.slice(index + 1),
          ];
        } else if (index === state.activeList.length - 1) {
          state.activeList = state.activeList = [...state.activeList, ...keys];
        } else {
          state.activeList = [
            ...state.activeList.slice(0, index + 1),
            ...keys,
            ...state.activeList.slice(index + 1),
          ];
        }
      } else {
        state.genres = [
          ...state.genres.filter((g) => g.id !== action.payload.id),
        ];
      }
    },
    updateKeywords: (state, action) => {
      if (
        state.keywords.filter((k) => k.id === action.payload.id).length === 0
      ) {
        return {
          ...state,
          keywords: [...state.keywords, action.payload],
        };
      } else {
        return {
          ...state,
          keywords: [
            ...state.keywords.filter((k) => k.id !== action.payload.id),
          ],
        };
      }
    },
    addKeyword: (state, action) => {
      let currList = state.activeList;
      state.activeList = [action.payload, ...currList];
    },
    resetFlow: (state) => {
      return initialState;
    },
  },
});

export const {
  updateStep,
  updateGenre,
  updateKeywords,
  addKeyword,
  resetFlow,
} = flowSlice.actions;

export default flowSlice.reducer;

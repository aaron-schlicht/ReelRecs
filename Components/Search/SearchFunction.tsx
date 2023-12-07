import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Movie } from "../../constants";
import * as Haptics from "expo-haptics";
import { styles, StyledTextInput } from "./SearchFunction.styled";
import {
  removeSelectedMovie,
  updateSelectedMovie,
  updateFocus,
} from "../../redux/movieSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetSearchResultsQuery } from "../../redux/apiSlice";
import SearchResults from "./SearchResults";

const SEARCH = "search";

const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, 200);

    return () => clearTimeout(timeout);
  }, [value]);

  return debouncedValue;
};

export default function SearchFunction() {
  const { selectedMovie, focus } = useSelector((state: any) => state.movies);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const debouncedValue = useDebounce(query);
  const { data } = useGetSearchResultsQuery(debouncedValue);

  const onPress = (movie: Movie) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!!selectedMovie && selectedMovie.id === movie.id) {
      dispatch(removeSelectedMovie());
    } else {
      dispatch(updateSelectedMovie(movie));
    }
  };

  const handleCancel = () => {
    setQuery("");
    if (!!selectedMovie) {
      dispatch(removeSelectedMovie(selectedMovie));
    }
    dispatch(updateFocus("home"));
  };

  if (focus !== SEARCH) return null;

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContent}>
        <View style={styles.inputContainer}>
          <Ionicons name="search" color="#ccc" size={15} />
          <StyledTextInput
            query={query}
            handleChange={(e) => setQuery(e)}
            handleSearch={() => Keyboard.dismiss()}
          />
          {query.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                setQuery("");
                if (!!selectedMovie) {
                  dispatch(removeSelectedMovie(selectedMovie));
                }
              }}
            >
              <Ionicons name="close-circle" color="#ccc" size={18} />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => handleCancel()}
        >
          <Text style={{ color: "white", fontWeight: "500", fontSize: 18 }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      <SearchResults
        movies={data ? data.results : []}
        onPress={onPress}
        selectedMovie={selectedMovie}
      />
    </View>
  );
}

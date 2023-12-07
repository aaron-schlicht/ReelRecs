import { View, ScrollView } from "react-native";
import { Movie } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { ImageButton, styles } from "./SearchFunction.styled";

const SearchResults = ({
  movies,
  onPress,
  selectedMovie,
}: {
  movies: Movie[];
  onPress: (movie: Movie) => void;
  selectedMovie: Movie;
}) => {
  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={styles.searchResultContainer}
        alwaysBounceVertical={false}
      >
        {movies.length
          ? movies.map((movie, index) => {
              if (!movie.poster_path) return null;
              const isSelected =
                !!selectedMovie && selectedMovie.id === movie.id;
              return (
                <View key={`result-${index}`}>
                  {isSelected ? (
                    <Ionicons
                      position="absolute"
                      style={styles.checkIcon}
                      name="checkmark-circle"
                      color="#ccc"
                      size={25}
                    />
                  ) : null}
                  <ImageButton
                    movie={movie}
                    onPress={onPress}
                    isSelected={isSelected}
                  />
                </View>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};

export default SearchResults;

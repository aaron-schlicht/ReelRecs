import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  ImageSourcePropType,
} from "react-native";
import { useState } from "react";
import { Movie } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  searchBarContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 40,
    width: "70%",
    padding: 8,
  },
  input: {
    paddingLeft: 5,
    width: "87%",
    color: "white",
  },
  closeButton: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  searchResultContainer: {
    height: "auto",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 15,
    marginVertical: 0,
  },
  checkIcon: {
    right: -6,
    top: -12,
    zIndex: 99,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchButtonText: {
    color: "#ccc",
    fontWeight: "300",
    fontSize: 25,
  },
  unfocusedContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export const ImageButton: React.FC<{
  movie: Movie;
  onPress: (movie: Movie) => void;
  isSelected: boolean;
}> = ({ movie, onPress, isSelected }) => {
  const [error, setError] = useState(false);
  const path = "https://image.tmdb.org/t/p/original/" + movie.poster_path;
  return (
    <View
      style={{
        width: 110,
        margin: 5,
        height: 165,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          borderRadius: 5,
          borderWidth: 2,
          borderColor: isSelected ? "#ccc" : "#6e7275",
          justifyContent: "center",
          backgroundColor: "#6e7275",
        }}
        onPress={() => onPress(movie)}
      >
        {error ? (
          <Ionicons name="film" color="white" size={40} />
        ) : (
          <Image
            style={{ width: 100, height: 150, borderRadius: 5 }}
            source={{ uri: path }}
            onError={() => setError(true)}
          />
        )}
      </TouchableOpacity>
      <Text
        numberOfLines={2}
        style={{ paddingTop: 5, color: "white", textAlign: "center" }}
      >
        {movie.title}
      </Text>
    </View>
  );
};

export const StyledTextInput: React.FC<{
  query: string;
  handleSearch: () => void;
  handleChange: (e: string) => void;
}> = ({ handleSearch, handleChange, query }) => {
  return (
    <TextInput
      keyboardAppearance="dark"
      autoFocus
      autoCapitalize="sentences"
      autoCorrect={false}
      placeholderTextColor="white"
      style={styles.input}
      onChangeText={(text) => handleChange(text)}
      value={query}
      returnKeyType="search"
      onSubmitEditing={() => handleSearch()}
      placeholder="Search movies..."
    />
  );
};

export const Logo = () => {
  const imagePath = require("../../assets/tmdb.png");
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Ionicons name="film-outline" color="white" size={35} />
        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
          ReelRecs
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "300" }}>Powered by</Text>
        <Image
          source={imagePath as ImageSourcePropType}
          resizeMode="contain"
          style={{ width: 70, height: 20 }}
        />
      </View>
    </View>
  );
};

export const LogoLarge = () => {
  const imagePath = require("../../assets/tmdb.png");
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Ionicons name="film-outline" color="white" size={35} />
        <Text style={{ color: "white", fontSize: 35, fontWeight: "bold" }}>
          ReelRecs
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "300", fontSize: 14 }}>
          Powered by
        </Text>
        <Image
          source={imagePath as ImageSourcePropType}
          resizeMode="contain"
          style={{ width: 105, height: 30 }}
        />
      </View>
    </View>
  );
};

import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import MovieScreen from "./MovieScreen";
import { FullMovie } from "../constants";
import { useSelector } from "react-redux";
import { useGetMovieInfoQuery, useGetProvidersQuery } from "../redux/apiSlice";

export default function InfoFunction() {
  const { selectedMovie } = useSelector((state: any) => state.movies);
  const [movieVisible, setMovieVisible] = useState(false);
  const [fullMovie, setFullMovie] = useState<FullMovie | null>(null);
  const { data: movieData } = useGetMovieInfoQuery(
    selectedMovie ? selectedMovie.id : 0,
    {
      skip: !selectedMovie,
    }
  );
  const { data: providerData } = useGetProvidersQuery(
    selectedMovie ? selectedMovie.id : 0,
    { skip: !selectedMovie }
  );

  const onMovieScreenClose = () => {
    setMovieVisible(false);
  };

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      {!!selectedMovie ? (
        <TouchableOpacity
          style={{
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#ccc",
            width: "90%",
            padding: 10,
            height: 50,
            justifyContent: "center",
          }}
          onPress={() => {
            if (movieData && providerData) setMovieVisible(true);
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "500",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Movie Info
          </Text>
        </TouchableOpacity>
      ) : null}

      <MovieScreen
        visible={movieVisible}
        onClose={onMovieScreenClose}
        movie={
          movieData && providerData ? { ...movieData, services: [] } : null
        }
      />
    </View>
  );
}

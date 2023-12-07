import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import SortModal from "../SortScreen";
import {
  Movie,
  FullMovie,
  imageBasePath,
  WatchProvider,
} from "../../constants";
import MovieScreen from "../MovieScreen";
import { styles, NavBar } from "./SimilarMoviesScreen.styled";
import { getMovieInfo } from "../../Api";
import { updateSimilarMovies } from "../../redux/movieSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SimilarMoviesScreen() {
  const { similarMovies, selectedServices } = useSelector(
    (state: any) => state.movies
  );
  const [activeSort, setActiveSort] = useState("");
  const [movie, setMovie] = useState<FullMovie | null>(null);
  const [visible, setVisible] = useState(false);
  const [movieVisible, setMovieVisible] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    getFullMovies();
  }, []);

  const getFullMovies = async () => {
    let fullMovies: FullMovie[] = [];
    for (let i = 0; i < similarMovies.length; i++) {
      const res = await getMovieInfo(similarMovies[i].id);
      if (res) {
        fullMovies.push(res);
      }
    }
    dispatch(updateSimilarMovies(fullMovies));
  };

  function compareFn(a: Movie, b: Movie) {
    switch (activeSort) {
      case "POP_DESC":
        return b.popularity - a.popularity;
      case "POP_ASC":
        return a.popularity - b.popularity;
      case "RATE_DESC":
        return b.vote_average - a.vote_average;
      case "RATE_ASC":
        return a.vote_average - b.vote_average;
      case "RELEASE_DESC":
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
      case "RELEASE_ASC":
        return (
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
        );
      default:
        return b.popularity - a.popularity;
    }
  }

  const handlePress = async (movie: FullMovie) => {
    setMovie(movie);
    setMovieVisible(!movieVisible);
  };

  const onClose = () => {
    setMovieVisible(false);
    setMovie(null);
  };

  const filterByService = (movie: FullMovie) => {
    if (selectedServices.length > 0) {
      if (movie.services) {
        const contains = movie.services.filter((service) =>
          selectedServices
            .map((service: WatchProvider) => service.provider_id)
            .includes(service.provider_id)
        );
        if (contains.length > 0) {
          return true;
        }
      }
      return false;
    }
    return true;
  };

  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "black" }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <NavBar
          onBack={() => navigation.goBack()}
          onPressFilter={() => setVisible(true)}
        />
        <ScrollView style={styles.scrollContainer}>
          {similarMovies
            .filter((movie: FullMovie) => filterByService(movie))
            .sort((a: Movie, b: Movie) => compareFn(a, b))
            .slice(0, 40)
            .map((movie: Movie, index: number) => {
              const path = imageBasePath + movie.poster_path;
              return (
                <TouchableOpacity
                  key={`similar-movie-${index}`}
                  onPress={() => handlePress(movie)}
                >
                  <View style={styles.movieFlex}>
                    <Image style={styles.moviePoster} source={{ uri: path }} />
                    <View style={styles.titleContainer}>
                      <Text style={styles.titleText} numberOfLines={2}>
                        {movie.title}
                      </Text>
                      <View style={{ flexDirection: "row", paddingTop: 10 }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                          {new Date(movie.release_date).getFullYear()}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          <View style={{ height: 100 }} />
        </ScrollView>
        <MovieScreen visible={movieVisible} onClose={onClose} movie={movie} />
        <SortModal
          visible={visible}
          setVisible={setVisible}
          setActiveSort={setActiveSort}
        />
      </SafeAreaView>
    </View>
  );
}

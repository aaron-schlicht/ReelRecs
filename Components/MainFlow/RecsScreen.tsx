import { View, Text, FlatList, Image, SafeAreaView } from "react-native";
import { Movie, imageBasePath } from "../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
type recsScreenProp = StackNavigationProp<RootStackParamList, "Recs">;

const RecsScreen = () => {
  const similarMovies = useSelector(
    (state: RootState) => state.movies.similarMovies
  );
  const navigation = useNavigation<recsScreenProp>();

  return (
    <View style={{ flex: 1, backgroundColor: "#15182D" }}>
      <SafeAreaView>
        <FlatList
          data={similarMovies}
          renderItem={({ item }) => (
            <MovieItem key={`item-${item.id}`} movie={item} />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const MovieItem = ({ movie }: { movie: Movie }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Image
        style={{
          width: 80,
          height: 120,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: "#ccc",
        }}
        source={{ uri: imageBasePath + movie.poster_path }}
      />
      <View>
        <Text style={{ color: "white", fontSize: 20 }}>{movie.title}</Text>
      </View>
    </View>
  );
};

export default RecsScreen;

import { View, StatusBar, ScrollView } from "react-native";
import SearchFunction from "../Search";
import SimilarMoviesFunction from "../SimilarMovies/SimilarMoviesFunction";
import { SafeAreaView } from "react-native";
import { styles } from "./Home.styled";
import InfoFunction from "../InfoFunction";
import { LogoLarge } from "../Search/SearchFunction.styled";
import Lucky from "../Lucky/Lucky";
import SearchButton from "../Search/SearchButton";
import { useSelector } from "react-redux";
import MainFlow from "../MainFlow/MainFlow";
import { RootState } from "../../redux/store";

const HOME = "home";

export default function Home() {
  const focus = useSelector((state: RootState) => state.movies.focus);
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <LogoLarge />
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1 }}>
          {focus !== HOME ? null : (
            <View style={{ flex: 1 }}>
              <View style={styles.flexView}>
                <Lucky />
                <SearchButton />
              </View>
              <MainFlow />
            </View>
          )}
          <SearchFunction />
          <InfoFunction />
          <SimilarMoviesFunction />
        </View>
      </SafeAreaView>
    </View>
  );
}

import {
  View,
  SafeAreaView,
  Text,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { FC } from "react";
import { FullMovie } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./MovieScreen.styled";

const MovieScreen: FC<{
  movie: FullMovie | null;
  visible: boolean;
  onClose: any;
}> = ({ movie, visible, onClose }) => {
  const base_path = "https://image.tmdb.org/t/p/original/";
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <SafeAreaView style={{ width: "100%" }}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => onClose()}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollContainer}>
            {movie ? (
              <View style={{ width: "100%" }}>
                <View style={styles.topInfo}>
                  <Image
                    style={styles.moviePoster}
                    source={{ uri: base_path + movie.poster_path }}
                  />
                  <View
                    style={{
                      paddingHorizontal: 20,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.titleText}>{movie.title}</Text>
                    </View>
                    <View style={styles.infoFlex}>
                      <Text style={styles.infoText}>
                        {new Date(movie.release_date).getFullYear()}
                      </Text>
                      <Text style={styles.infoText}>|</Text>
                      <Text style={styles.infoText}>
                        {movie.runtime} minutes
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: 5,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "white" }}>Average Rating: </Text>
                      <Text style={styles.infoText}>
                        {movie.vote_average.toFixed(2)}
                      </Text>
                      <Text style={{ color: "white" }}>/10</Text>
                    </View>
                  </View>
                </View>
                <View style={{ padding: 20 }}>
                  <Text style={styles.taglineText}>{movie.tagline}</Text>

                  <Text style={styles.infoText}>{movie.overview}</Text>
                </View>
                {movie.services && movie.services.length > 0 ? (
                  <View style={styles.servicesContainer}>
                    <View style={styles.underlinedBox}>
                      <Text style={styles.titleText}>Available On</Text>
                    </View>
                    <View
                      style={{
                        paddingTop: 15,
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {movie.services.map((service) => {
                        const path =
                          "https://image.tmdb.org/t/p/original/" +
                          service.logo_path;
                        return (
                          <Image
                            key={`provider-${service.provider_id}`}
                            source={{ uri: path }}
                            style={styles.serviceImage}
                          />
                        );
                      })}
                    </View>
                  </View>
                ) : null}
              </View>
            ) : (
              <Text style={{ color: "white" }}>
                Sorry, there was an issue retrieving the info for this film
              </Text>
            )}
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default MovieScreen;

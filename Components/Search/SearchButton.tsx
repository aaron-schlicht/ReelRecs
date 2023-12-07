import { TouchableOpacity, View } from "react-native";
import { styles } from "./SearchFunction.styled";
import { useDispatch } from "react-redux";
import { updateFocus } from "../../redux/movieSlice";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchButton = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.unfocusedContainer}>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => dispatch(updateFocus("search"))}
      >
        <Ionicons name="search" color="#ccc" size={40} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchButton;

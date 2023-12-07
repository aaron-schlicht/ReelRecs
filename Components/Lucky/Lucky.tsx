import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Lucky = () => {
  return (
    <View style={{ alignItems: "center", gap: 5 }}>
      <FontAwesome5 name="dice" color="#ccc" size={40} />
    </View>
  );
};

export default Lucky;

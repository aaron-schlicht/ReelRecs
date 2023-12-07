import {
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Providers } from "../../constants";
import * as Haptics from "expo-haptics";
import { updateSelectedServices } from "../../redux/movieSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProviderSelect() {
  const { selectedServices } = useSelector((state: any) => state.movies);
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 10,
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Providers.map((provider, index) => {
        const selected = selectedServices.includes(provider);
        return (
          <View key={`provider-${index}`}>
            <TouchableOpacity
              style={{
                width: 70,
                height: 70,
                margin: 10,
                marginVertical: 5,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: selected ? 2 : 0,
                borderColor: selected ? "white" : "",
              }}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                dispatch(updateSelectedServices(provider));
              }}
            >
              <Image
                source={provider.logo_url as ImageSourcePropType}
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 5,
                  opacity: selected ? 1 : 0.65,
                }}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

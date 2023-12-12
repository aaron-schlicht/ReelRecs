import {
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  TouchableHighlight,
} from "react-native";
import { Providers, WatchProvider, imageBasePath } from "../../constants";
import * as Haptics from "expo-haptics";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateSelectedServices } from "../../redux/movieSlice";
import { memo, useEffect } from "react";
import { RootState } from "../../redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { isEqual } from "lodash";

export default function ProviderSelect() {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Providers.map((provider) => {
        return (
          <ProviderButton
            key={`provider-${provider.provider_id}`}
            provider={provider}
          />
        );
      })}
    </View>
  );
}

const ProviderButton = ({ provider }: { provider: WatchProvider }) => {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) =>
      !!state.movies.selectedServices.find(
        (p) => p.provider_id === provider.provider_id
      )
  );
  return (
    <View>
      <TouchableHighlight
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
        underlayColor="transparent"
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          dispatch(updateSelectedServices(provider));
        }}
      >
        <Image
          source={{ uri: imageBasePath + provider.logo_url }}
          style={{
            width: 55,
            height: 55,
            borderRadius: 5,
            opacity: selected ? 1 : 0.65,
          }}
        />
      </TouchableHighlight>
    </View>
  );
};

import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import { Genre, KeywordMap } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { updateStep } from "../../redux/flowSlice";

const KeywordStep = () => {
  const { genre } = useSelector((state: any) => state.flow);
  const dispatch = useDispatch();

  if (!genre) dispatch(updateStep(0));

  return (
    <View>
      <View
        style={{
          padding: 20,
          backgroundColor: "#252942",
          borderRadius: 15,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Now start to pick some keywords
        </Text>
      </View>
      <ScrollView style={{ width: "100%" }}>
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: 12,
            columnGap: 15,
          }}
        >
          {KeywordMap[genre.id].map((keyword) => {
            return (
              <GenreButton
                key={`keyword-${keyword.id}`}
                genre={keyword}
                isActive={false}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const GenreButton = ({
  genre,
  isActive,
}: {
  genre: Genre;
  isActive: boolean;
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? "#A3BBD3" : "#252942",
        padding: 10,
        paddingVertical: 15,
        borderRadius: 10,
        flexGrow: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text
          style={{
            color: isActive ? "#15182D" : "#FFF",
            textAlign: "center",
            fontSize: 18,
          }}
        >
          {genre.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default KeywordStep;

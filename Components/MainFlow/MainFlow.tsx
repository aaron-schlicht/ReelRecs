import { View, Text } from "react-native";
import GenreStep from "./GenreStep";
import { useSelector, useDispatch } from "react-redux";
import KeywordStep from "./KeywordStep";

const MainFlow = () => {
  const { step } = useSelector((state: any) => state.flow);

  const CurrentStep = () => {
    switch (step) {
      case 0:
        return <GenreStep />;
      case 1:
        return <KeywordStep />;
    }
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 5,
      }}
    >
      <GenreStep />
    </View>
  );
};

export default MainFlow;

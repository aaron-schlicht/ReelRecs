import { View, Text } from "react-native";
import GenreStep from "./GenreStep";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import KeywordStep from "./KeywordStep";
import FilterStep from "./FilterStep";
import { RootState } from "../../redux/store";

const MainFlow = () => {
  const step = useSelector((state: RootState) => state.flow.step);

  const CurrentStep = () => {
    switch (step) {
      case 0:
        return <GenreStep />;
      case 1:
        return <FilterStep />;
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
      <CurrentStep />
    </View>
  );
};

export default MainFlow;

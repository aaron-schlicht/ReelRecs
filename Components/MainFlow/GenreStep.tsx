import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
  TextInput,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  updateGenre,
  updateKeywords,
  updateStep,
  resetFlow,
  addKeyword,
} from "../../redux/flowSlice";
import {
  Genre,
  GenreIcons,
  Genres,
  Keyword,
  KeywordMap,
} from "../../constants";
import { useCallback, useEffect, useRef, useState } from "react";
import * as Haptics from "expo-haptics";
import { useLazyGetKeywordSearchResultsQuery } from "../../redux/apiSlice";
import KeywordSearch from "./KeywordSearch";
import { LinearGradient } from "expo-linear-gradient";
import { RootState } from "../../redux/store";

const GenreStep = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const activeList = useSelector((state: RootState) => state.flow.activeList);
  const keywords = useSelector((state: RootState) => state.flow.keywords);
  const dispatch = useDispatch();
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(resetFlow());
    }, 500);
  }, []);

  const [getKeywordSearchResults, results] =
    useLazyGetKeywordSearchResultsQuery();

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ y: scrollPos, animated: false });
    console.log(scrollPos);
  }, [scrollPos]);

  const handleGenreSelect = (selection: Genre) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(updateGenre(selection));
  };

  const handleKeywordSelect = (selection: Keyword) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(updateKeywords(selection));
  };

  const handleNext = () => {
    dispatch(updateStep(1));
  };

  useEffect(() => {
    console.log(genres);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Use genres and keywords to find movies
      </Text>
      <KeywordSearch />
      <FlatList
        data={[
          ...activeList.filter(
            (item: { name: string; id: number }, index: number) => {
              return (
                index ===
                activeList.findIndex(
                  (key: { name: string; id: number }) => key.id === item.id
                )
              );
            }
          ),
        ]}
        numColumns={3}
        horizontal={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={{ marginTop: 10 }}
        contentContainerStyle={{ paddingBottom: 65 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const { id, name } = item;
          const genre = Genres[id];
          if (genre) {
            return (
              <View style={{ width: "33%" }} key={`genre-${genre.id}`}>
                <GenreButton
                  genre={genre}
                  handleSelect={handleGenreSelect}
                  isActive={
                    !!genres.filter((g: Genre) => g.id === genre.id).length
                  }
                />
              </View>
            );
          }
          return (
            <View style={{ width: "33%" }} key={`keyword-${id}`}>
              <KeywordButton
                keyword={{ ...item }}
                handleSelect={handleKeywordSelect}
                isActive={!!keywords.filter((k: Keyword) => k.id == id).length}
              />
            </View>
          );
        }}
      />
      {!genres.length && !keywords.length ? null : (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            width: "120%",
          }}
        >
          <LinearGradient
            style={{
              width: "100%",
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            colors={["transparent", "rgba(21, 24, 45, 0.5)"]}
          >
            <TouchableHighlight
              style={{
                backgroundColor: "white",
                width: 150,
                borderRadius: 30,
                padding: 10,
              }}
              underlayColor="rgba(255,255,255,0.8)"
              onPress={handleNext}
            >
              <Text
                style={{ textAlign: "center", fontWeight: "500", fontSize: 25 }}
              >
                Next
              </Text>
            </TouchableHighlight>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

const GenreButton = ({
  handleSelect,
  genre,
  isActive,
}: {
  handleSelect: (value: any) => void;
  genre: Genre;
  isActive: boolean;
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? "#A3BBD3" : "#252942",
        flex: 1,
        alignItems: "center",
        gap: 5,
        margin: 5,
        justifyContent: "center",
        borderRadius: 15,
        padding: 10,
        height: 60,
      }}
      onPress={() => handleSelect(genre)}
    >
      <Text style={{ fontSize: 20 }}>{GenreIcons[genre.id]}</Text>
      <Text
        style={{
          color: isActive ? "#15182D" : "#FFF",
          textAlign: "center",
          fontSize: 14,
        }}
        numberOfLines={1}
        allowFontScaling={true}
        adjustsFontSizeToFit={true}
      >
        {genre.name}
      </Text>
    </TouchableOpacity>
  );
};

const KeywordButton = ({
  handleSelect,
  keyword,
  isActive,
}: {
  handleSelect: (value: any) => void;
  keyword: Keyword;
  isActive: boolean;
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? "#A3BBD3" : "#252942",
        padding: 5,
        flex: 1,
        borderRadius: 15,
        margin: 5,
        height: 60,
        justifyContent: "center",
      }}
      onPress={() => handleSelect(keyword)}
    >
      <Text
        style={{
          color: isActive ? "#15182D" : "#FFF",
          textAlign: "center",
          fontSize: 14,
        }}
        numberOfLines={2}
        adjustsFontSizeToFit={true}
        allowFontScaling={true}
      >
        {keyword.name.charAt(0).toUpperCase() + keyword.name.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

export default GenreStep;

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

const GenreStep = () => {
  const { genres, keywords, activeList } = useSelector(
    (state: any) => state.flow
  );
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
    <View style={{ flex: 1, padding: 10 }}>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Start finding a movie by genre
      </Text>
      <View>
        <TextInput
          style={{
            padding: 10,
            paddingLeft: 20,
            backgroundColor: "#252942",
            borderRadius: 15,
            marginTop: 15,
            fontSize: 16,
            height: 50,
            color: "white",
          }}
          placeholder={`Search keywords... Try "Spies"`}
        />
      </View>
      <FlatList
        data={activeList}
        numColumns={3}
        horizontal={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={{ marginTop: 20 }}
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
                    genres.filter((g: Genre) => g.id === genre.id).length
                  }
                />
              </View>
            );
          }
          const keyword = Object.values(KeywordMap)
            .flat()
            .find((key: Keyword) => key.id === id)!;

          return (
            <View style={{ width: "33%" }} key={`keyword-${id}`}>
              <KeywordButton
                keyword={keyword}
                handleSelect={handleKeywordSelect}
                isActive={
                  keywords.filter((k: Keyword) => k.id == keyword.id).length
                }
              />
            </View>
          );
        }}
      />
      {!genres.length ? null : (
        <View
          style={{
            position: "absolute",
            bottom: 30,
            alignItems: "center",
          }}
        >
          <TouchableHighlight
            style={{
              backgroundColor: "white",
              width: 150,
              borderRadius: 15,
              padding: 10,
            }}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "500", fontSize: 25 }}
              onPress={handleNext}
            >
              Next
            </Text>
          </TouchableHighlight>
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

/*


  <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ref={scrollViewRef}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: 12,
            columnGap: 15,
          }}
        >
          {activeList.map((value: { id: number; name: string }) => {
            const { id, name } = value;
            const genre = Genres[id];
            if (genre) {
              return (
                <View style={{ flexGrow: 1 }} key={`genre-${genre.id}`}>
                  <GenreButton
                    genre={genre}
                    handleSelect={handleGenreSelect}
                    isActive={
                      genres.filter((g: Genre) => g.id === genre.id).length
                    }
                  />
                </View>
              );
            }
            const keyword = Object.values(KeywordMap)
              .flat()
              .find((key: Keyword) => key.id === id);
            if (keyword) {
              return (
                <View style={{ flexGrow: 1 }} key={`keyword-${id}`}>
                  <KeywordButton
                    keyword={keyword}
                    handleSelect={handleKeywordSelect}
                    isActive={
                      keywords.filter((k: Keyword) => k.id == keyword.id).length
                    }
                  />
                </View>
              );
            }
          })}
        </View>
      </ScrollView>

*/

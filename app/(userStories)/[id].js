import React from "react";
import Carousel, { getInputRangeFromIndexes } from "react-native-snap-carousel";
import { Dimensions, Platform, View } from "react-native";
import Story from "../../components/storyInfo";
import { useSearchParams } from "expo-router";
import { userData } from "../../data/userData";
import { StoryView } from "../../context/storyViewContext";
import { useContext } from "react";

const Window = Dimensions.get("window");

const width = Window.width;
const height = Window.height;

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

const POSITION = Platform.OS === "ios" ? 2 : 1.5;
const ZOOM = Math.sin(toRadians(65));
const MARGIN25 = (width - 320) / 31.3 + 7;
const MARGIN50 = (width - 320) / 23.5 + 13;
const MARGIN100 = (width - 320) / 47 + 5;

const Item = ({ item, index }) => {
  return (
    <View
      key={index}
      style={[
        {
          height: height * 0.9,
          top: 50,
          backgroundColor: "#fff",
          borderRadius: 10,
        },
      ]}
    >
      <Story
        users={item.stories}
        name={item.user}
        profileImage={item.profileImage}
        userID={item.id}
      />
    </View>
  );
};
const data = [
  { id: 1, color: "red" },
  { id: 2, color: "pink" },
  { id: 3, color: "yellow" },
  { id: 4, color: "green" },
  { id: 5, color: "blue" },
];

const App = () => {
  const { id } = useSearchParams();

  const { userInfo, updateUserStories } = useContext(StoryView);
  const startIndex = userInfo.findIndex((ele) => ele.id == id);

  const scrollInterpolator = (index, carouselProps) => {
    const range = [1, 0, -1];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;

    return { inputRange, outputRange };
  };

  const animatedStyles = (i, scrollX, carouselProps) => {
    return {
      transform: [
        {
          perspective: 2 * width,
        },
        {
          translateX: scrollX.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [width / POSITION, 0, -width / POSITION],
          }),
        },
        {
          rotateY: scrollX.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: ["-90deg", "0deg", "90deg"],
          }),
        },
        {
          scale: scrollX.interpolate({
            inputRange: [-1, -0.5, 0, 0.5, 1],
            outputRange: [1, ZOOM, 1, ZOOM, 1],
          }),
        },
        {
          translateX: scrollX.interpolate({
            inputRange: [-1, -0.75, -0.5, 0, 0.5, 0.75, 1],
            outputRange: [
              -width / POSITION + MARGIN100,
              (-width * ZOOM * 0.75) / POSITION + MARGIN25,
              (-width * ZOOM * 0.5) / POSITION + MARGIN50,
              0,
              (width * ZOOM * 0.5) / POSITION - MARGIN50,
              (width * ZOOM * 0.75) / POSITION - MARGIN25,
              width / POSITION - MARGIN100,
            ],
          }),
        },
      ],
      opacity: scrollX.interpolate({
        inputRange: [-1, -0.5, 0.5, 1],
        outputRange: [0.4, 1, 1, 0.4],
      }),
    };
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
      }}
    >
      <Carousel
        firstItem={startIndex}
        containerCustomStyle={{ width }}
        data={userInfo}
        useScrollView={true}
        renderItem={(props) => <Item {...props} />}
        sliderWidth={width}
        itemWidth={width}
        scrollInterpolator={scrollInterpolator}
        slideInterpolatedStyle={animatedStyles}
      />
    </View>
  );
};

export default App;

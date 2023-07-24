import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  Text,
} from "react-native";
import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { StoryView } from "../context/storyViewContext";
import { useContext } from "react";

const Story = ({ users, profileImage, name, userID }) => {
  const { updateUserStories } = useContext(StoryView);
  const navigation = useNavigation();
  const [currentStory, setCurrentStory] = useState(0);
  const [content, setContent] = useState(users);

  const progress = useRef(new Animated.Value(0)).current;
  const start = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        next();
      }
    });
  };

  const next = () => {
    const currentStoryId = users.find((ele, i) => i === currentStory);

    updateUserStories(userID, currentStoryId.id);
    if (currentStory != content.length - 1) {
      let tempData = content;
      tempData[currentStory].finish = 1;
      setContent(tempData);
      setCurrentStory(currentStory + 1);
      progress.setValue(0);
    } else {
      close();
    }
  };

  const previous = () => {
    if (currentStory - 1 >= 0) {
      let tempData = content;
      tempData[currentStory].finish = 0;
      setContent(tempData);
      setCurrentStory(currentStory - 1);
      progress.setValue(0);
    } else {
      close();
    }
  };

  const close = () => {
    progress.setValue(0);
    navigation.goBack();
  };

  return (
    <View style={styles.storyModalContainer}>
      <Image
        style={styles.storyModalImage}
        source={content[currentStory].image}
        onLoadEnd={() => {
          progress.setValue(0);
          start();
        }}
      />
      <View style={styles.storyModalProgressContainer}>
        {content.map((item, i) => (
          <View key={i} style={styles.storyModalProgress}>
            <Animated.View
              style={{
                flex: currentStory == i ? progress : content[i].finish,
                height: 3,
                backgroundColor: "rgba(255,255,255,1)",
              }}
            ></Animated.View>
          </View>
        ))}
      </View>

      <View style={styles.storyModalUserContainer}>
        <View style={styles.storyModalUser}>
          <Image source={profileImage} style={styles.storyModalUserImage} />
          <Text style={styles.storyModalUserText}>{name}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            close();
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              paddingHorizontal: 15,
            }}
          >
            <Image
              style={styles.top40}
              source={require("../assest/close.png")}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.storyModalcontrols}>
        <TouchableOpacity
          style={styles.storyModalLeft}
          onPress={() => {
            previous();
          }}
        >
          <View></View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.storyModalRight}
          onPress={() => {
            next();
          }}
        >
          <View></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  storyModalContainer: {
    backgroundColor: "#000",
    opacity: 0.8,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  storyModalImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  storyModalProgressContainer: {
    width: Dimensions.get("window").width,
    position: "absolute",
    top: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  storyModalProgress: {
    flex: 1,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginLeft: 5,
  },
  storyModalcontrols: {
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flexDirection: "row",
    justifyContent: "center",
  },
  storyModalRight: {
    width: "50%",
    height: Dimensions.get("window").height,
  },
  storyModalLeft: {
    width: "50%",
    height: Dimensions.get("window").height,
  },

  storyModalUserContainer: {
    width: Dimensions.get("window").width,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 30,
  },
  storyModalUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  storyModalUserImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  storyModalUserText: {
    fontSize: 18,
    marginLeft: 8,
  },
});

export default Story;

import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { userData } from "../data/userData";
import { StoryView } from "../context/storyViewContext";
import { useState, useEffect } from "react";
import { useContext } from "react";

const UserStories = () => {
  const { userInfo } = useContext(StoryView);
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {userInfo?.map((data, index) => {
          if (data.stories.every((story) => story.seen)) {
            return <></>;
          }
          return (
            <Link key={index} href={`/${data.id}`}>
              <View key={index} style={styles.storyWarper}>
                <View style={styles.storyContainer}>
                  <Image source={data.profileImage} style={styles.story} />
                </View>
                <Text style={styles.storyText}>{data.user}</Text>
              </View>
            </Link>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  storyWarper: {
    marginRight: 8,
  },
  storyContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ff8501",
    borderRadius: 50,
  },
  story: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  storyText: { textAlign: "center", marginTop: 8 },
});

export default UserStories;

import { View } from "react-native";
import { StoryViewProvider } from "../context/storyViewContext";
import UserStories from "../components/userStories";

const Home = () => {
  return (
    <View>
      <UserStories />
    </View>
  );
};

export default Home;

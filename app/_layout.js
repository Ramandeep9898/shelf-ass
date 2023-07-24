import { Stack } from "expo-router";
import { StoryViewProvider } from "../context/storyViewContext";

const Layout = () => {
  return (
    <StoryViewProvider>
      <Stack />
    </StoryViewProvider>
  );
};

export default Layout;

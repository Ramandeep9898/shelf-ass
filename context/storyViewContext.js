import React, { createContext, useState } from "react";
import { userData } from "../data/userData";

export const StoryView = createContext();

export const StoryViewProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(userData);

  const updateUserStories = (userID, storyID) => {
    setUserInfo((prev) => {
      const nextUserData = prev.map((user) => {
        if (userID === user.id) {
          return {
            ...user,
            stories: user.stories.map((story) => {
              if (story.id === storyID) {
                return {
                  ...story,
                  seen: true,
                };
              }
              return story;
            }),
          };
        }
        return user;
      });

      return nextUserData;
    });
  };

  return (
    <StoryView.Provider value={{ userInfo, updateUserStories }}>
      {children}
    </StoryView.Provider>
  );
};

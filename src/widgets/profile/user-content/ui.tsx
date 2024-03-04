import { Center, Loader, Tabs } from "@mantine/core";
import { useUnit } from "effector-react";
import { PostView } from "src/entities/post";
import { LikePostButton, ReplyButton, RepostButton } from "src/features/post";
import { $activeTab, $loading, $tabContent, changeActiveTab } from "./model";
import styles from "./ui.module.css";
import { useEffect } from "react";

const tablist = ["Posts", "Replies", "Likes"];

export const UserContent = () => {
  const [activeTab, tabContent, loading] = useUnit([
    $activeTab,
    $tabContent,
    $loading,
  ]);
  useEffect(() => {
    changeActiveTab("Posts");
  }, []);
  return (
    <Tabs
      color="light-blue.9"
      classNames={{
        root: styles["root"],
        tab: styles["tab"],
        list: styles["list"],
      }}
      value={activeTab}
      onChange={changeActiveTab}
    >
      <Tabs.List justify="center">
        {tablist.map((tab) => (
          <Tabs.Tab value={tab} key={tab}>
            {tab}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      <Tabs.Panel value={activeTab ?? ""} pt={20}>
        {loading && (
          <Center>
            <Loader />
          </Center>
        )}
        {tabContent.map((post) => {
          return (
            <PostView
              key={post.id}
              post={post}
              layout={"feed"}
              controlButtons={{
                reply: (
                  <ReplyButton
                    repliesCount={post.repliesCount}
                    key={`replyButton ${post.id}`}
                    source={post}
                  />
                ),
                repost: (
                  <RepostButton
                    key={`repostButton ${post.id}`}
                    parentPost={post}
                  />
                ),
                like: (
                  <LikePostButton
                    key={`likeButton ${post.id}`}
                    postId={post.id}
                    likesCount={post.likesCount}
                    isLiked={post.isLiked}
                  />
                ),
              }}
            />
          );
        })}
      </Tabs.Panel>
    </Tabs>
  );
};

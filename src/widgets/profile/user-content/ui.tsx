import { Tabs } from "@mantine/core";
import styles from "./ui.module.css";
import { useUnit } from "effector-react";
import { $activeTab, changeActiveTab } from "./model";

const tablist = ["Posts", "Replies", "Likes"];

export const UserContent = () => {
  const activeTab = useUnit($activeTab);
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

      <Tabs.Panel value={activeTab ?? ""}>{activeTab}</Tabs.Panel>
    </Tabs>
  );
};

import { BaseLayout } from "src/shared/ui";
import { Feed } from "src/widgets/feed/ui";
import { Header } from "src/widgets/header";
import { Sidebar } from "src/widgets/sidebar";
export const HomePage = () => {
  return (
    <BaseLayout sidebar={<Sidebar />} header={<Header />} main={<Feed />} />
  );
};

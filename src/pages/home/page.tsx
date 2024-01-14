import { BaseLayout } from "src/shared/ui";
import { Feed } from "src/widgets/feed/ui";
import { Sidebar } from "src/widgets/sidebar";
export const HomePage = () => {
  return (
    <BaseLayout
      sidebar={<Sidebar />}
      header={<div>Header</div>}
      main={<Feed />}
    />
  );
};

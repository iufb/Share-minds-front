import { BaseLayout } from "src/shared/ui";
import { Sidebar } from "src/widgets/sidebar";
export const ExplorePage = () => {
  return (
    <BaseLayout
      sidebar={<Sidebar />}
      header={<div>Header</div>}
      main={<div>Search</div>}
    />
  );
};

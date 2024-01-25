import { routes } from "src/shared/routing";
import { BaseLayout } from "src/shared/ui";
import { Sidebar } from "src/widgets/sidebar";
export const PostPage = () => {
  return (
    <BaseLayout
      sidebar={<Sidebar />}
      header={<div>Header</div>}
      main={
        <div>
          Post <Main />
        </div>
      }
    />
  );
};
function Main() {
  const { id } = routes.post.$params.getState();
  return <div>{id}</div>;
}

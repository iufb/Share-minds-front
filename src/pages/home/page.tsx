import { CreatePostButton, CreatePostForm } from "src/features/post";
import { BaseLayout } from "src/shared/ui";
import { Sidebar } from "src/widgets/sidebar";
export const HomePage = () => {
  return (
    <BaseLayout
      sidebar={<Sidebar />}
      header={<div>Header</div>}
      main={
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CreatePostForm />
          {new Array(6).fill("main").map((w, idx) => (
            <div key={idx} style={{ height: 300, border: "1px solid red" }}>
              {idx} {w}
              <CreatePostButton variant="base" />
            </div>
          ))}
        </div>
      }
    />
  );
};

import { Box, Title } from "@mantine/core";
import { BaseLayout } from "src/shared/ui";
import { Header } from "src/widgets/header";
import { Sidebar } from "src/widgets/sidebar";

export const BookmarksPage = () => {
  return (
    <BaseLayout
      sidebar={<Sidebar />}
      header={<Header center={<BookmarkHeader />} />}
      main={<Main />}
    />
  );
};
function BookmarkHeader() {
  return (
    <Box>
      <Title order={1}>Bookmarks</Title>
    </Box>
  );
}
function Main() {
  return <Box>Bookmark</Box>;
}

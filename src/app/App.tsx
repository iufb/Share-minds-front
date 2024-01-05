import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import './globals.css'
import { RoutesView } from "src/pages";
import { RouterProvider } from "atomic-router-react";
import { router } from "src/shared/routing";
export default function App() {

  return <MantineProvider theme={theme}>
    <RouterProvider router={router}>
      <RoutesView />
    </RouterProvider>
  </MantineProvider >;
}

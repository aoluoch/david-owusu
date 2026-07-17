import { RouterProvider } from "react-router-dom";
import { ContentProvider } from "./lib/ContentContext";
import { router } from "./router";

function App() {
  return (
    <ContentProvider>
      <RouterProvider router={router} />
    </ContentProvider>
  );
}

export default App;

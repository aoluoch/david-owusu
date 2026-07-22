import { RouterProvider } from "react-router-dom";
import { ContentProvider } from "./lib/ContentContext";
import { AuthProvider } from "./lib/AuthContext";
import { router } from "./router";

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <RouterProvider router={router} />
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;

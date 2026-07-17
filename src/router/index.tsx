import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { LeadershipPage } from "../pages/LeadershipPage";
import { CorporatePage } from "../pages/CorporatePage";
import { EventsPage } from "../pages/EventsPage";
import { GalleryPage } from "../pages/GalleryPage";
import { ContactPage } from "../pages/ContactPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "leadership", element: <LeadershipPage /> },
      { path: "corporate", element: <CorporatePage /> },
      { path: "events", element: <EventsPage /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

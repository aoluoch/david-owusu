import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { LeadershipPage } from "../pages/LeadershipPage";
import { CorporatePage } from "../pages/CorporatePage";
import { EventsPage } from "../pages/EventsPage";
import { EventDetailPage } from "../pages/EventDetailPage";
import { BlogPage } from "../pages/BlogPage";
import { BlogPostPage } from "../pages/BlogPostPage";
import { GalleryPage } from "../pages/GalleryPage";
import { ContactPage } from "../pages/ContactPage";
import { InvitePage } from "../pages/InvitePage";
import { PartnerPage } from "../pages/PartnerPage";
import { LegalPage } from "../pages/LegalPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { AdminLayout } from "../admin/AdminLayout";
import { AdminLogin } from "../admin/AdminLogin";
import { AdminDashboard } from "../admin/AdminDashboard";
import { AdminContent } from "../admin/AdminContent";
import { AdminEvents } from "../admin/AdminEvents";
import { AdminEventEdit } from "../admin/AdminEventEdit";
import { AdminBlog } from "../admin/AdminBlog";
import { AdminBlogEdit } from "../admin/AdminBlogEdit";
import { AdminGallery } from "../admin/AdminGallery";
import { AdminMessages } from "../admin/AdminMessages";
import { RequireAuth } from "../admin/RequireAuth";

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
      { path: "events/:slug", element: <EventDetailPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/:slug", element: <BlogPostPage /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "invite", element: <InvitePage /> },
      { path: "partner", element: <PartnerPage /> },
      { path: "privacy-policy", element: <LegalPage page="privacy" /> },
      {
        path: "terms-and-conditions",
        element: <LegalPage page="terms" />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  { path: "/admin/login", element: <AdminLogin /> },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "content", element: <AdminContent /> },
      { path: "events", element: <AdminEvents /> },
      { path: "events/new", element: <AdminEventEdit /> },
      { path: "events/:id", element: <AdminEventEdit /> },
      { path: "blog", element: <AdminBlog /> },
      { path: "blog/new", element: <AdminBlogEdit /> },
      { path: "blog/:id", element: <AdminBlogEdit /> },
      { path: "gallery", element: <AdminGallery /> },
      { path: "messages", element: <AdminMessages /> },
    ],
  },
]);

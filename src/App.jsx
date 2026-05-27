import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AdminLayout from './admin/components/AdminLayout.jsx';
import ProtectedRoute from './admin/components/ProtectedRoute.jsx';
import AdminDashboard from './admin/pages/AdminDashboard.jsx';
import AdminLogin from './admin/pages/AdminLogin.jsx';
import CrudPage from './admin/pages/CrudPage.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import MobileQuickActions from './components/layout/MobileQuickActions.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Admissions from './pages/Admissions.jsx';
import Academics from './pages/Academics.jsx';
import Gallery from './pages/Gallery.jsx';
import News from './pages/News.jsx';
import Events from './pages/Events.jsx';
import Contact from './pages/Contact.jsx';
import FAQ from './pages/FAQ.jsx';
import PayFees from './pages/PayFees.jsx';
import StudentPortal from './pages/StudentPortal.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = new URLSearchParams(window.location.search).get('redirect');
    if (redirect) {
      navigate(redirect, { replace: true });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate, pathname]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white text-brand-gray transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <ScrollToTop />
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/pay-fees" element={<PayFees />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="students" element={<CrudPage section="students" />} />
              <Route path="academic" element={<CrudPage section="academic" />} />
              <Route path="logo" element={<CrudPage section="logo" />} />
              <Route path="teachers" element={<CrudPage section="teachers" />} />
              <Route path="admissions" element={<CrudPage section="admissions" />} />
              <Route path="results" element={<CrudPage section="results" />} />
              <Route path="payments" element={<CrudPage section="payments" />} />
              <Route path="events" element={<CrudPage section="events" />} />
              <Route path="news" element={<CrudPage section="news" />} />
              <Route path="gallery" element={<CrudPage section="gallery" />} />
              <Route path="settings" element={<CrudPage section="settings" />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <MobileQuickActions />}
    </div>
  );
}

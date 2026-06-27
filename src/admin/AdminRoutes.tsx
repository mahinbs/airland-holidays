import { Routes, Route, Navigate } from 'react-router-dom';
import { entityConfigs } from './config/entities';
import { AdminRoute, AdminLoginRoute } from './components/AdminRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import EntityList from './pages/EntityList';
import EntityEdit from './pages/EntityEdit';
import AdminSubmissions from './pages/AdminSubmissions';
import AdminSettings from './pages/AdminSettings';
import AdminHeaderNav from './pages/AdminHeaderNav';
import AdminFaq from './pages/AdminFaq';
import AdminAccessRequests from './pages/AdminAccessRequests';
import AdminPayment from './pages/AdminPayment';
import AdminFooter from './pages/AdminFooter';
import AdminAbout from './pages/AdminAbout';
import AdminHomepage from './pages/AdminHomepage';
import AdminServicesPage from './pages/AdminServicesPage';
import AdminUsers from './pages/AdminUsers';
import { SuperAdminRoute } from './components/SuperAdminRoute';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLoginRoute />}>
        <Route path="login" element={<AdminLogin />} />
      </Route>
      <Route path="/" element={<AdminRoute />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="submissions" element={<AdminSubmissions />} />
        <Route path="access-requests" element={<SuperAdminRoute><AdminAccessRequests /></SuperAdminRoute>} />
        <Route path="faq" element={<AdminFaq />} />
        <Route path="header" element={<AdminHeaderNav />} />
        <Route path="footer" element={<AdminFooter />} />
        <Route path="payment" element={<AdminPayment />} />
        <Route path="about" element={<AdminAbout />} />
        <Route path="homepage" element={<AdminHomepage />} />
        <Route path="services-page" element={<AdminServicesPage />} />
        <Route path="users" element={<SuperAdminRoute><AdminUsers /></SuperAdminRoute>} />
        <Route path="settings" element={<AdminSettings />} />
        {entityConfigs.map((entity) => (
          <Route key={entity.key} path={entity.key} element={<EntityList entityKey={entity.key} />} />
        ))}
        {entityConfigs.map((entity) => (
          <Route key={`${entity.key}-edit`} path={`${entity.key}/:id`} element={<EntityEdit entityKey={entity.key} />} />
        ))}
      </Route>
    </Routes>
  );
}

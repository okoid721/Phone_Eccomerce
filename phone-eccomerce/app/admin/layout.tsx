import AdminNav from '../components/admin/AdminNav';

export const metadata = {
  title: 'Kings-Mobile Admin',
  description: 'Kings Admin Dashboard',
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <AdminNav />
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;

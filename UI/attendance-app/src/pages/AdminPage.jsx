import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import { Button } from '@/components/ui/button';
import DepartmentsTab from '../components/admin/DepartmentsTab';
import EmployeesTab from '../components/admin/EmployeesTab';
import AttendanceTab from '../components/admin/AttendanceTab';

const tabs = [
  { key: 'departments', label: 'Departments' },
  { key: 'employees', label: 'Employees' },
  { key: 'attendance', label: 'Attendance' },
];

export default function AdminPage() {
  const [tab, setTab] = useState('departments');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 relative overflow-hidden">
      {/* Background decorative blur blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage departments, employees, and attendance
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground hover:bg-secondary border border-border"
          >
            Logout
          </Button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  tab === t.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'departments' && (
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-create-dept'))}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              + Create department
            </button>
          )}

          {tab === 'employees' && (
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-create-emp'))}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              + Create employee
            </button>
          )}
        </div>

        {/* Tab Content */}
        {tab === 'departments' && <DepartmentsTab />}
        {tab === 'employees' && <EmployeesTab />}
        {tab === 'attendance' && <AttendanceTab />}
      </div>
    </div>
  );
}
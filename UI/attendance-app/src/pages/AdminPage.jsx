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
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
      {/* Background decorative blur blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Manage departments, employees, and attendance
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
          >
            Logout
          </Button>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                tab === t.key
                  ? 'bg-white text-black'
                  : 'bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === 'departments' && <DepartmentsTab />}
        {tab === 'employees' && <EmployeesTab />}
        {tab === 'attendance' && <AttendanceTab />}
      </div>
    </div>
  );
}
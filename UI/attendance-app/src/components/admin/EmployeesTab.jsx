import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllEmployees, createEmployee, deleteEmployee, getAllDepartments } from '../../api';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function EmployeesTab() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    departmentId: '',
  });

  const {
    data: employees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: getAllEmployees,
  });

  const { data: departments = [] } = useQuery({
    queryKey: ['departments'],
    queryFn: getAllDepartments,
  });

  const createMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setFormData({ name: '', email: '', phone: '', role: '', password: '', departmentId: '' });
      setMessage({ type: 'success', text: 'Employee created successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    },
    onError: (error) => {
      setMessage({
        type: 'error',
        text: error?.response?.data?.message || 'Failed to create employee.',
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setMessage({ type: 'success', text: 'Employee deleted successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    },
    onError: (error) => {
      setMessage({
        type: 'error',
        text: error?.response?.data?.message || 'Failed to delete employee.',
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    },
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.departmentId) return;
    createMutation.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      password: formData.password,
      departmentId: formData.departmentId,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteMutation.mutate(id);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const term = searchTerm.toLowerCase();
    return (
      emp.name?.toLowerCase().includes(term) ||
      emp.email?.toLowerCase().includes(term) ||
      emp.role?.toLowerCase().includes(term)||
      emp.department?.departmentName?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Employee Table */}
      <div className="lg:col-span-2">
        <Card className="bg-zinc-950/40 backdrop-blur-xl border-zinc-800">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-white text-lg">All Employees</CardTitle>
                <CardDescription className="text-zinc-400">
                  Manage your organization's employees
                </CardDescription>
              </div>
              <Input
                type="text"
                placeholder="Search by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sm:w-64 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </div>
          </CardHeader>
          <CardContent>
            {message.text && (
              <div
                className={`mb-4 px-4 py-2 rounded-lg text-sm ${
                  message.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}
              >
                {message.text}
              </div>
            )}

            {isLoading && (
              <p className="text-zinc-400 text-sm py-4">Loading employees...</p>
            )}

            {isError && (
              <p className="text-red-400 text-sm py-4">Failed to load employees.</p>
            )}

            {!isLoading && !isError && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-zinc-300 text-sm">
                  <thead className="border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4 font-medium text-zinc-400">#</th>
                      <th className="py-3 px-4 font-medium text-zinc-400">Name</th>
                      <th className="py-3 px-4 font-medium text-zinc-400">Email</th>
                      <th className="py-3 px-4 font-medium text-zinc-400">Role</th>
                      <th className="py-3 px-4 font-medium text-zinc-400">Department</th>
                      <th className="py-3 px-4 font-medium text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {filteredEmployees.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-6 px-4 text-center text-zinc-500">
                          {searchTerm ? 'No employees match your search.' : 'No employees found.'}
                        </td>
                      </tr>
                    ) : (
                      filteredEmployees.map((emp, index) => {
                        if(emp.role !== 'Administrator'){
                          return(<tr key={emp.id} className="hover:bg-zinc-900/50 transition-colors">
                            <td className="py-3 px-4">{index + 1}</td>
                            <td className="py-3 px-4 font-medium text-white">{emp.name}</td>
                            <td className="py-3 px-4">{emp.email}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-full text-xs bg-zinc-800 text-zinc-300">
                                {emp.role}
                              </span>
                            </td>
                            <td className="py-3 px-4">{emp.department?.departmentName || '—'}</td>
                            <td className="py-3 px-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                onClick={() => handleDelete(emp.id)}
                                disabled={deleteMutation.isPending}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>)}
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Employee Form */}
      <div className="lg:col-span-1">
        <Card className="bg-zinc-950/40 backdrop-blur-xl border-zinc-800 overflow-y-auto max-h-[80vh]">
            <CardHeader>
              <CardTitle className="text-white text-lg">Create Employee</CardTitle>
            <CardDescription className="text-zinc-400">
              Add a new employee to the organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            {departments.length === 0 && (
              <div className="mb-4 px-4 py-2 rounded-lg text-sm bg-amber-500/10 text-amber-400 border border-amber-500/20">
                No departments exist yet. Please create a department first.
              </div>
            )}
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="empName" className="text-zinc-300">Name</Label>
                  <Input
                    id="empName"
                    type="text"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empEmail" className="text-zinc-300">Email</Label>
                  <Input
                    id="empEmail"
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empPassword" className="text-zinc-300">Password</Label>
                  <Input
                    id="empPassword"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empPhone" className="text-zinc-300">Phone</Label>
                  <Input
                    id="empPhone"
                    type="text"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empRole" className="text-zinc-300">Role</Label>
                  <Input
                    id="empRole"
                    type="text"
                    placeholder="e.g. Software Engineer"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empDepartment" className="text-zinc-300">Department</Label>
                  <select
                    id="empDepartment"
                    value={formData.departmentId}
                    onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                    className="w-full rounded-md bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm focus:outline-none focus:border-zinc-500"
                  >
                    <option value="">Select a department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.departmentName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-zinc-200 transition-colors"
                disabled={createMutation.isPending || departments.length === 0}
              >
                {createMutation.isPending ? 'Creating...' : 'Create Employee'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

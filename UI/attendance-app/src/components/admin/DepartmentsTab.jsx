import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllDepartments, createDepartment, deleteDepartment } from '../../api';
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

export default function DepartmentsTab() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ departmentName: '', location: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  const {
    data: departments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['departments'],
    queryFn: getAllDepartments,
  });

  const createMutation = useMutation({
    mutationFn: ({ departmentName, location }) => createDepartment(departmentName, location),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      setFormData({ departmentName: '', location: '' });
      setMessage({ type: 'success', text: 'Department created successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    },
    onError: (error) => {
      setMessage({
        type: 'error',
        text: error?.response?.data?.message || 'Failed to create department.',
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      setMessage({ type: 'success', text: 'Department deleted successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    },
    onError: (error) => {
      setMessage({
        type: 'error',
        text: error?.response?.data?.message || 'Failed to delete department.',
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    },
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.departmentName.trim() || !formData.location.trim()) return;
    createMutation.mutate(formData);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Department Table */}
      <div className="lg:col-span-2">
        <Card className="bg-zinc-950/40 backdrop-blur-xl border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">All Departments</CardTitle>
            <CardDescription className="text-zinc-400">
              Manage your organization's departments
            </CardDescription>
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
              <p className="text-zinc-400 text-sm py-4">Loading departments...</p>
            )}

            {isError && (
              <p className="text-red-400 text-sm py-4">Failed to load departments.</p>
            )}

            {!isLoading && !isError && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-zinc-300 text-sm">
                  <thead className="border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4 font-medium text-zinc-400">#</th>
                      <th className="py-3 px-4 font-medium text-zinc-400">Name</th>
                      <th className="py-3 px-4 font-medium text-zinc-400">Location</th>
                      <th className="py-3 px-4 font-medium text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {departments.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-6 px-4 text-center text-zinc-500">
                          No departments found.
                        </td>
                      </tr>
                    ) : (
                      departments.map((dept, index) => (
                        <tr key={dept.id} className="hover:bg-zinc-900/50 transition-colors">
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4 font-medium text-white">
                            {dept.departmentName}
                          </td>
                          <td className="py-3 px-4">{dept.location}</td>
                          <td className="py-3 px-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              onClick={() => handleDelete(dept.id)}
                              disabled={deleteMutation.isPending}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Department Form */}
      <div className="lg:col-span-1">
        <Card className="bg-zinc-950/40 backdrop-blur-xl border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Create Department</CardTitle>
            <CardDescription className="text-zinc-400">
              Add a new department to the organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="departmentName" className="text-zinc-300">
                  Department Name
                </Label>
                <Input
                  id="departmentName"
                  type="text"
                  placeholder="e.g. Engineering"
                  value={formData.departmentName}
                  onChange={(e) =>
                    setFormData({ ...formData, departmentName: e.target.value })
                  }
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-zinc-300">
                  Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="e.g. Building A, Floor 3"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-zinc-200 transition-colors"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? 'Creating...' : 'Create Department'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

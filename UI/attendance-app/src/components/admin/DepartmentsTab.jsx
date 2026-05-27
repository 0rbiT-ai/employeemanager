import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllDepartments, createDepartment, deleteDepartment } from '../../api';
import { Button } from '@/components/ui/button';
import {  updateDepartment } from '../../api';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


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
  const [Employee, setEmployee] = useState(0);
  const [isdeleteopen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editDeptId, setEditDeptId] = useState(null);
  const [iscreateopen, setIsCreateOpen] = useState(false);
  const [page,setPage] = useState(0);
  const [size,setSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handler = () => setIsCreateOpen(true);
    window.addEventListener('open-create-dept', handler);
    return () => window.removeEventListener('open-create-dept', handler);
  }, []);
  
const {
    data: departments = { content: [] },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['departments',page,size,searchTerm],
    queryFn: () => getAllDepartments(page,size,searchTerm),
  });

  const createMutation = useMutation({
    mutationFn: ({ departmentName, location }) => createDepartment(departmentName, location),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      setIsCreateOpen(false);
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

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateDepartment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      setIsEditOpen(false);
      setFormData({ departmentName: '', location: '' });
      setMessage({ type: 'success', text: 'Department updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    },
    onError: (error) => {
      setMessage({
        type: 'error',
        text: error?.response?.data?.message || 'Failed to update department.',
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
    setEmployee(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate(Employee);
    setIsDeleteOpen(false);
  };
  const handleEdit = (dept) => {
    setEditDeptId(dept.id);
    setFormData({ departmentName: dept.departmentName || '', location: dept.location || '' });
    setIsEditOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!formData.departmentName.trim() || !formData.location.trim()) return;
    updateMutation.mutate({ id: editDeptId, data: formData });
  };

  return (
    <div>
      {/* Department Table */}
      
      <div className="lg:col-span-2">
        <Card className="bg-card/40 backdrop-blur-xl border-border">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-foreground text-lg">All Departments</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your organization's departments
                </CardDescription>
              </div>
              <Input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sm:w-64 bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-ring"
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
              <p className="text-muted-foreground text-sm py-4">Loading departments...</p>
            )}

            {isError && (
              <p className="text-red-400 text-sm py-4">Failed to load departments.</p>
            )}

            {!isLoading && !isError && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-foreground text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="py-3 px-4 font-medium text-muted-foreground">#</th>
                      <th className="py-3 px-4 font-medium text-muted-foreground">Name</th>
                      <th className="py-3 px-4 font-medium text-muted-foreground">Location</th>
                      <th className="py-3 px-4 font-medium text-muted-foreground text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {departments.content.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-6 px-4 text-center text-muted-foreground">
                          {searchTerm ? 'No departments match your search.' : 'No departments found.'}
                        </td>
                      </tr>
                    ) : (
                      departments.content.map((dept, index) => (
                        <tr key={dept.id} className="hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4">{page* size + index + 1}</td>
                          <td className="py-3 px-4 font-medium text-foreground">
                            {dept.departmentName}
                          </td>
                          <td className="py-3 px-4">{dept.location}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                                onClick={() => handleEdit(dept)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                onClick={() => handleDelete(dept.id)}
                                disabled={deleteMutation.isPending}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between gap-4 ">

                  <div className="flex items-center gap-2">

                    <label htmlFor="rows-per-page" className="text-sm text-muted-foreground">
                      Rows per page
                    </label>

                    <Select
                      value={String(size)}
                      onValueChange={(value) => {
                        setSize(Number(value))
                        setPage(0)
                      }}
                    >

                      <SelectTrigger
                        className="w-20 bg-muted border-border text-foreground"
                        id="rows-per-page"
                      >
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>

                        <SelectGroup>

                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>

                        </SelectGroup>

                      </SelectContent>

                    </Select>

                  </div>

                  <div className="flex items-center gap-4">

                    <span className="text-sm text-muted-foreground">
                      Page {page + 1} of {departments.totalPages || 1}
                    </span>

                    <Pagination className="mx-0 w-auto">

                      <PaginationContent>

                        <PaginationItem>

                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()

                              if (page > 0) {
                                setPage(page - 1)
                              }
                            }}
                            className={
                              page === 0
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />

                        </PaginationItem>

                        <PaginationItem>

                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()

                              if (page + 1 < departments.totalPages) {
                                setPage(page + 1)
                              }
                            }}
                            className={
                              page + 1 >= departments.totalPages
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />

                        </PaginationItem>

                      </PaginationContent>

                    </Pagination>

                  </div>

                </div>

              </div>
            </>
            )}
          </CardContent>
        </Card>
      </div>

      {iscreateopen && (
  <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-50">
    <div className="bg-card p-6 rounded-2xl w-full max-w-md border border-border">

      <h2 className="text-foreground text-2xl font-bold mb-2">
        Create Department
      </h2>

      <p className="text-muted-foreground mb-6">
        Add a new department to the organization
      </p>

      <form onSubmit={handleCreate} className="space-y-4">

        <div className="space-y-2">
          <Label htmlFor="departmentName" className="text-foreground">
            Department Name
          </Label>

          <Input
            id="departmentName"
            type="text"
            placeholder="e.g. Engineering"
            value={formData.departmentName}
            onChange={(e) =>
              setFormData({
                ...formData,
                departmentName: e.target.value,
              })
            }
            className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-foreground">
            Location
          </Label>

          <Input
            id="location"
            type="text"
            placeholder="e.g. Building A"
            value={formData.location}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: e.target.value,
              })
            }
            className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">

          <button
            type="button"
            onClick={() => setIsCreateOpen(false)}
            className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent"
          >
            Cancel
          </button>

          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending
              ? 'Creating...'
              : 'Create Department'}
          </Button>

        </div>

      </form>
    </div>
  </div>
)}
      {isdeleteopen && (
        <div className='fixed inset-0 flex items-center justify-center bg-background/80'>
          <div className="bg-card p-6 rounded-xl w-96">
            <h2 className="!text-foreground text-xl font-bold mb-4">
              Delete Department
            </h2>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete this department? This action cannot be undone.
            </p>
            <div className="flex justify-between gap-4 mt-6">
              <button
              onClick={() => setIsDeleteOpen(false)}
              className="px-4 py-2 rounded-lg bg-accent"
              >
                Cancel
              </button>
              <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-50">
          <div className="bg-card p-6 rounded-2xl w-full max-w-md border border-border">
            <h2 className="text-foreground text-2xl font-bold mb-2">Edit Department</h2>
            <p className="text-muted-foreground mb-6">Update department details</p>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editDepartmentName" className="text-foreground">Department Name</Label>
                <Input
                  id="editDepartmentName"
                  type="text"
                  placeholder="e.g. Engineering"
                  value={formData.departmentName}
                  onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editLocation" className="text-foreground">Location</Label>
                <Input
                  id="editLocation"
                  type="text"
                  placeholder="e.g. Building A"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState , useEffect} from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createEmployee, deleteEmployee, getAllDepartments,filteremployees } from '../../api';
import { Button } from '@/components/ui/button';
import {  updateEmployee } from '../../api';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

export default function EmployeesTab() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    departmentId: '',
  });

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [isdeleteopen, setIsDeleteOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    const handler = () => setIsCreateOpen(true);
    window.addEventListener('open-create-emp', handler);
    return () => window.removeEventListener('open-create-emp', handler);
  }, []);

  const {
    data: employees = { content: [] },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['employees',page,size,searchTerm],
    queryFn: () => filteremployees(page, size, searchTerm),
  });

  const { data: departments = {content: [] } } = useQuery({
    queryKey: ['departments',page,size],
    queryFn: () => getAllDepartments(0,100),
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

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setIsEditOpen(false);
      setFormData({ name: '', email: '', phone: '', role: '', password: '', departmentId: '' });
      setMessage({ type: 'success', text: 'Employee updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    },
    onError: (error) => {
      setMessage({
        type: 'error',
        text: error?.response?.data?.message || 'Failed to update employee.',
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
    setSelectedEmployeeId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEmployeeId !== null) {
      deleteMutation.mutate(selectedEmployeeId);
      setIsDeleteOpen(false);
      setSelectedEmployeeId(null);
    }
  };

  const handleEdit = (emp) => {
    setEditEmployeeId(emp.id);
    setFormData({
      name: emp.name || '',
      email: emp.email || '',
      phone: emp.phone || '',
      role: emp.role || '',
      password: emp.password || '',
      departmentId: emp.department?.id || '',
    });
    setIsEditOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.departmentId) return;
    updateMutation.mutate({ id: editEmployeeId, data: formData });
  };


    
 

  return (
    <div >
      {/* Employee Table */}
      <div className="lg:col-span-2">
        <Card className="bg-card/40 backdrop-blur-xl border-border">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-foreground text-lg">All Employees</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your organization's employees
                </CardDescription>
              </div>
              <Input
                type="text"
                placeholder="Search by name, email, or role..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(0);
                }}
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
              <p className="text-muted-foreground text-sm py-4">Loading employees...</p>
            )}

            {isError && (
              <p className="text-red-400 text-sm py-4">Failed to load employees.</p>
            )}

            {!isLoading && !isError && (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-foreground text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="py-3 px-4 font-medium text-muted-foreground">#</th>
                        <th className="py-3 px-4 font-medium text-muted-foreground">Name</th>
                        <th className="py-3 px-4 font-medium text-muted-foreground">Email</th>
                        <th className="py-3 px-4 font-medium text-muted-foreground">Role</th>
                        <th className="py-3 px-4 font-medium text-muted-foreground">Department</th>
                        <th className="py-3 px-4 font-medium text-muted-foreground text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {employees.content.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-6 px-4 text-center text-muted-foreground">
                            {searchTerm ? 'No employees match your search.' : 'No employees found.'}
                          </td>
                        </tr>
                      ) : (
                        employees.content.map((emp, index) => {
                          if(emp.role !== 'Administrator'){
                            return(<tr key={emp.id} className="hover:bg-muted/50 transition-colors">
                              <td className="py-3 px-4">{page * size + index + 1}</td>
                              <td className="py-3 px-4 font-medium text-foreground">{emp.name}</td>
                              <td className="py-3 px-4">{emp.email}</td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-0.5 rounded-full text-xs bg-secondary text-foreground">
                                  {emp.role}
                                </span>
                              </td>
                              <td className="py-3 px-4">{emp.department?.departmentName || '—'}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center justify-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                                    onClick={() => handleEdit(emp)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                    onClick={() => handleDelete(emp)}
                                    disabled={deleteMutation.isPending}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>)}
                        })
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6">

              <div className="flex items-center justify-between gap-4">

                <div className="flex items-center gap-2">

                  <label
                    htmlFor="rows-per-page"
                    className="text-sm text-muted-foreground"
                  >
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
                    Page {page + 1} of {employees.totalPages || 1}
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

                            if (page + 1 < employees.totalPages) {
                              setPage(page + 1)
                            }
                          }}
                          className={
                            page + 1 >= employees.totalPages
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

      
      
      {isdeleteopen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
          <div className="bg-muted p-6 rounded-xl w-96">
            <h2 className="!text-foreground text-xl font-bold mb-4">
              Delete Employee
            </h2>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete this employee? This action cannot be undone.
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
      {isCreateOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

    <div className="bg-card border border-border rounded-2xl p-6 w-[700px] max-h-[90vh] overflow-y-auto">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-foreground text-2xl font-bold">
            Create Employee
          </h2>

          <h3 className="text-muted-foreground text-sm mt-1 ">
            Add a new employee to the organization
          </h3>
        </div>

        <button
          onClick={() => setIsCreateOpen(false)}
          className="text-muted-foreground hover:text-foreground text-xl"
        >
          ✕
        </button>

      </div>

          {departments.content.length === 0 && (
            <div className="mb-4 px-4 py-2 rounded-lg text-sm bg-amber-500/10 text-amber-400 border border-amber-500/20">
              No departments exist yet. Please create a department first.
            </div>
          )}

          <form
            onSubmit={(e) => {
              handleCreate(e);
              setIsCreateOpen(false);
            }}
            className="space-y-4"
          >

            <div className="grid grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label className="text-foreground">Name</Label>

                <Input
                  type="text"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-muted border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Email</Label>

                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-muted border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Password</Label>

                <Input
                  type="text"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="bg-muted border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Phone</Label>

                <Input
                  type="text"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="bg-muted border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Role</Label>

                <Input
                  type="text"
                  placeholder="Software Engineer"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="bg-muted border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Department</Label>

                <select
                  value={formData.departmentId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      departmentId: e.target.value,
                    })
                  }
                  className="w-full rounded-md bg-muted border border-border text-foreground px-3 py-2 text-sm"
                >
                  <option value="">Select a department</option>

                  {departments.content.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.departmentName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">

              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {createMutation.isPending
                  ? 'Creating...'
                  : 'Create Employee'}
              </Button>

            </div>

          </form>

        </div>

      </div>
    )}

    {isEditOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-card border border-border rounded-2xl p-6 w-[700px] max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-foreground text-2xl font-bold">Edit Employee</h2>
              <h3 className="text-muted-foreground text-sm mt-1">Update employee details</h3>
            </div>
            <button
              onClick={() => setIsEditOpen(false)}
              className="text-muted-foreground hover:text-foreground text-xl"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Name</Label>
                <Input
                  type="text"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-muted border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Email</Label>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-muted border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Password</Label>
                <Input
                  type="text"
                  placeholder="Enter New Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-muted border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Phone</Label>
                <Input
                  type="text"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-muted border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Role</Label>
                <Input
                  type="text"
                  placeholder="Software Engineer"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="bg-muted border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Department</Label>
                <select
                  value={formData.departmentId}
                  onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                  className="w-full rounded-md bg-muted border border-border text-foreground px-3 py-2 text-sm"
                >
                  <option value="">Select a department</option>
                  {departments.content.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.departmentName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    )}
    </div>
  );
}
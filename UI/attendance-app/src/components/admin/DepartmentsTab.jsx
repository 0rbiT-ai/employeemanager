import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllDepartments, createDepartment, deleteDepartment } from '../../api';
import { Button } from '@/components/ui/button';
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
  const [iscreateopen, setIsCreateOpen] = useState(false);
  const [page,setPage] = useState(0);
  const [size,setSize] = useState(5);
  const {
    data: departments = { content: [] },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['departments',page,size],
    queryFn: () => getAllDepartments(page,size),
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Department Table */}
      <button onClick={() => setIsCreateOpen(true)}
          className="bg-zinc-900 text-zinc-400 hover:text-white border border-radius-70 px-1 py-1 rounded-lg mb-4 w-full">
          Create Department
        </button>
      
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
            <>
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
                    {departments.content.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-6 px-4 text-center text-zinc-500">
                          No departments found.
                        </td>
                      </tr>
                    ) : (
                      departments.content.map((dept, index) => (
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
              <div className="mt-6">
                <div className="flex items-center justify-between gap-4 ">

                  <div className="flex items-center gap-2">

                    <label htmlFor="rows-per-page" className="text-sm text-zinc-400">
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
                        className="w-20 bg-zinc-900 border-zinc-700 text-white"
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

                    <span className="text-sm text-zinc-400">
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
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-md border border-zinc-800">

      <h2 className="text-white text-2xl font-bold mb-2">
        Create Department
      </h2>

      <p className="text-zinc-400 mb-6">
        Add a new department to the organization
      </p>

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
              setFormData({
                ...formData,
                departmentName: e.target.value,
              })
            }
            className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-zinc-300">
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
            className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">

          <button
            type="button"
            onClick={() => setIsCreateOpen(false)}
            className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          >
            Cancel
          </button>

          <Button
            type="submit"
            className="bg-white text-black hover:bg-zinc-200"
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
        <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
          <div className="bg-zinc-900 p-6 rounded-xl w-96">
            <h2 className="!text-white text-xl font-bold mb-4">
              Delete Department
            </h2>
            <p className="text-zinc-400 mb-6">
              Are you sure you want to delete this department? This action cannot be undone.
            </p>
            <div className="flex justify-between gap-4 mt-6">
              <button
              onClick={() => setIsDeleteOpen(false)}
              className="px-4 py-2 rounded-lg bg-zinc-700"
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
    </div>
  );
}

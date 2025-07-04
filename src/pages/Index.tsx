
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import StudentForm, { Student } from '@/components/StudentForm';
import StudentList from '@/components/StudentList';

const Index = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleAddStudent = (studentData: Omit<Student, 'id'>) => {
    if (editingStudent) {
      // Update existing student
      setStudents(students.map(student => 
        student.id === editingStudent.id 
          ? { ...studentData, id: editingStudent.id }
          : student
      ));
      setEditingStudent(null);
      toast({
        title: "Berhasil!",
        description: "Data siswa berhasil diperbarui.",
      });
    } else {
      // Add new student
      const newStudent: Student = {
        ...studentData,
        id: generateId()
      };
      setStudents([...students, newStudent]);
      toast({
        title: "Berhasil!",
        description: "Data siswa berhasil ditambahkan.",
      });
    }
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteStudent = (id: string) => {
    const studentToDelete = students.find(s => s.id === id);
    setStudents(students.filter(student => student.id !== id));
    toast({
      title: "Berhasil!",
      description: `Data ${studentToDelete?.name} berhasil dihapus.`,
    });
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📚 Sistem Manajemen Data Siswa
          </h1>
          <p className="text-gray-600 text-lg">
            Kelola data siswa dengan mudah dan efisien
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-4">
            <div className="sticky top-4">
              <StudentForm 
                onSubmit={handleAddStudent}
                editingStudent={editingStudent}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-8">
            <StudentList 
              students={students}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 text-gray-500 text-sm">
          <p>© 2024 Sistem Manajemen Data Siswa</p>
        </div>
      </div>
    </div>
  );
};

export default Index;


import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Student {
  id: string;
  nim: string;
  name: string;
  major: string;
}

interface StudentFormProps {
  onSubmit: (student: Omit<Student, 'id'>) => void;
  editingStudent?: Student | null;
  onCancelEdit?: () => void;
}

const StudentForm = ({ onSubmit, editingStudent, onCancelEdit }: StudentFormProps) => {
  const [formData, setFormData] = useState({
    nim: '',
    name: '',
    major: ''
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        nim: editingStudent.nim,
        name: editingStudent.name,
        major: editingStudent.major
      });
    } else {
      setFormData({
        nim: '',
        name: '',
        major: ''
      });
    }
  }, [editingStudent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nim && formData.name && formData.major) {
      onSubmit({
        nim: formData.nim,
        name: formData.name,
        major: formData.major
      });
      setFormData({
        nim: '',
        name: '',
        major: ''
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-blue-600">
          {editingStudent ? 'Edit Data Siswa' : 'Input Data Siswa'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nim">NIM</Label>
            <Input
              id="nim"
              name="nim"
              type="text"
              value={formData.nim}
              onChange={handleChange}
              placeholder="Masukkan NIM"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="major">Jurusan</Label>
            <Input
              id="major"
              name="major"
              type="text"
              value={formData.major}
              onChange={handleChange}
              placeholder="Masukkan jurusan"
              required
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              {editingStudent ? 'Update' : 'Simpan'}
            </Button>
            {editingStudent && onCancelEdit && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancelEdit}
                className="flex-1"
              >
                Batal
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentForm;

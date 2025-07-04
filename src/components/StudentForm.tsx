
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Student {
  id: string;
  name: string;
  class: string;
  age: number;
  email: string;
}

interface StudentFormProps {
  onSubmit: (student: Omit<Student, 'id'>) => void;
  editingStudent?: Student | null;
  onCancelEdit?: () => void;
}

const StudentForm = ({ onSubmit, editingStudent, onCancelEdit }: StudentFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    age: '',
    email: ''
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        class: editingStudent.class,
        age: editingStudent.age.toString(),
        email: editingStudent.email
      });
    } else {
      setFormData({
        name: '',
        class: '',
        age: '',
        email: ''
      });
    }
  }, [editingStudent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.class && formData.age && formData.email) {
      onSubmit({
        name: formData.name,
        class: formData.class,
        age: parseInt(formData.age),
        email: formData.email
      });
      setFormData({
        name: '',
        class: '',
        age: '',
        email: ''
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
            <Label htmlFor="class">Kelas</Label>
            <Input
              id="class"
              name="class"
              type="text"
              value={formData.class}
              onChange={handleChange}
              placeholder="Contoh: XII IPA 1"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">Umur</Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder="Masukkan umur"
              min="1"
              max="100"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
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

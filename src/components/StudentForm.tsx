import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Student {
  id?: string;
  student_number: string;
  name: string;
  birth_date?: string;
  gender?: string;
  email?: string;
  phone_number?: string;
  address?: string;
}

interface StudentFormProps {
  onSubmit: (student: Omit<Student, "id">) => void;
  editingStudent?: Student | null;
  onCancelEdit?: () => void;
}

const StudentForm = ({
  onSubmit,
  editingStudent,
  onCancelEdit,
}: StudentFormProps) => {
  const [formData, setFormData] = useState<Omit<Student, "id">>({
    student_number: "",
    name: "",
    birth_date: "",
    gender: "",
    email: "",
    phone_number: "",
    address: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        student_number: editingStudent.student_number || "",
        name: editingStudent.name || "",
        birth_date: editingStudent.birth_date || "",
        gender: editingStudent.gender || "",
        email: editingStudent.email || "",
        phone_number: editingStudent.phone_number || "",
        address: editingStudent.address || "",
      });
    } else {
      setFormData({
        student_number: "",
        name: "",
        birth_date: "",
        gender: "",
        email: "",
        phone_number: "",
        address: "",
      });
    }
  }, [editingStudent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.student_number && formData.name) {
      onSubmit(formData);
      setFormData({
        student_number: "",
        name: "",
        birth_date: "",
        gender: "",
        email: "",
        phone_number: "",
        address: "",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-blue-600">
          {editingStudent ? "Edit Data Siswa" : "Input Data Siswa"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student_number">NIM / Student Number</Label>
            <Input
              id="student_number"
              name="student_number"
              type="text"
              value={formData.student_number}
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
            <Label htmlFor="birth_date">Tanggal Lahir</Label>
            <Input
              id="birth_date"
              name="birth_date"
              type="date"
              value={formData.birth_date}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Jenis Kelamin</Label>
            <Input
              id="gender"
              name="gender"
              type="text"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Laki-laki / Perempuan"
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
              placeholder="Masukkan email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone_number">No HP</Label>
            <Input
              id="phone_number"
              name="phone_number"
              type="text"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Masukkan nomor HP"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Alamat</Label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Masukkan alamat"
              className="w-full border rounded p-2"
              rows={2}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {editingStudent ? "Update" : "Simpan"}
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

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Student } from "./StudentForm";

export interface ApplicationFormData {
  student_id: string;
  academic_year: string;
  semester_type: string;
  status?: string;
  submitted_at?: string;
}

interface ApplicationFormProps {
  students: Student[];
  onSubmit: (form: ApplicationFormData) => void;
}

const ApplicationForm = ({ students, onSubmit }: ApplicationFormProps) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    student_id: "",
    academic_year: "",
    semester_type: "",
    status: "draft",
    submitted_at: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.student_id &&
      formData.academic_year &&
      formData.semester_type
    ) {
      onSubmit(formData);
      setFormData({
        student_id: "",
        academic_year: "",
        semester_type: "",
        status: "draft",
        submitted_at: "",
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-blue-600">
          Input Form Pendaftaran Ulang
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student_id">Pilih Siswa</Label>
            <select
              id="student_id"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">-- Pilih Siswa --</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.student_number} - {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="academic_year">Tahun Akademik</Label>
            <Input
              id="academic_year"
              name="academic_year"
              type="text"
              value={formData.academic_year}
              onChange={handleChange}
              placeholder="2025/2026"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="semester_type">Semester</Label>
            <select
              id="semester_type"
              name="semester_type"
              value={formData.semester_type}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">-- Pilih Semester --</option>
              <option value="ganjil">Ganjil</option>
              <option value="genap">Genap</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Simpan
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApplicationForm;

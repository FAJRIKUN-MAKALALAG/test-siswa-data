import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApplicationFormData } from "./ApplicationForm";
import { Student } from "./StudentForm";

export interface ApplicationFormListItem extends ApplicationFormData {
  id: string;
  status: string;
  submitted_at?: string;
}

interface ApplicationFormListProps {
  forms: ApplicationFormListItem[];
  students: Student[];
  onEdit: (form: ApplicationFormListItem) => void;
  onDelete: (id: string) => void;
}

const ApplicationFormList = ({
  forms,
  students,
  onEdit,
  onDelete,
}: ApplicationFormListProps) => {
  const getStudent = (id: string) => students.find((s) => s.id === id);

  if (forms.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-600">
            Data Form Pendaftaran Ulang
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">📄</div>
            <p className="text-gray-500">Belum ada data form</p>
            <p className="text-sm text-gray-400">
              Tambahkan form pendaftaran ulang pertama Anda!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-700">
          Data Form Pendaftaran Ulang ({forms.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">NIM</th>
                <th className="border px-2 py-1">Nama</th>
                <th className="border px-2 py-1">Tahun Akademik</th>
                <th className="border px-2 py-1">Semester</th>
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Submitted At</th>
                <th className="border px-2 py-1">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {forms.filter(Boolean).map((form) => {
                const student = getStudent(form.student_id);
                return (
                  <tr key={form.id}>
                    <td className="border px-2 py-1">
                      {student?.student_number || "-"}
                    </td>
                    <td className="border px-2 py-1">{student?.name || "-"}</td>
                    <td className="border px-2 py-1">{form.academic_year}</td>
                    <td className="border px-2 py-1">{form.semester_type}</td>
                    <td className="border px-2 py-1">{form.status}</td>
                    <td className="border px-2 py-1">
                      {form.submitted_at
                        ? new Date(form.submitted_at).toLocaleString()
                        : "-"}
                    </td>
                    <td className="border px-2 py-1">
                      <button
                        className="text-blue-600 hover:underline mr-2"
                        onClick={() => onEdit(form)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => onDelete(form.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationFormList;

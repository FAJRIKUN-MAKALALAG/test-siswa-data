import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Student } from "./StudentForm";

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  onShowHistory: (student: Student) => void;
}

const StudentList = ({
  students,
  onEdit,
  onDelete,
  onShowHistory,
}: StudentListProps) => {
  if (students.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-600">
            Data Siswa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">📚</div>
            <p className="text-gray-500">Belum ada data siswa</p>
            <p className="text-sm text-gray-400">
              Tambahkan data siswa pertama Anda!
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
          Data Siswa ({students.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">NIM</th>
                <th className="border px-2 py-1">Nama</th>
                <th className="border px-2 py-1">Tgl Lahir</th>
                <th className="border px-2 py-1">Gender</th>
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">No HP</th>
                <th className="border px-2 py-1">Alamat</th>
                <th className="border px-2 py-1">Last Updated</th>
                <th className="border px-2 py-1">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {students.filter(Boolean).map((student) => (
                <tr key={student.id}>
                  <td className="border px-2 py-1">{student.student_number}</td>
                  <td className="border px-2 py-1">{student.name}</td>
                  <td className="border px-2 py-1">
                    {student.birth_date || "-"}
                  </td>
                  <td className="border px-2 py-1">{student.gender || "-"}</td>
                  <td className="border px-2 py-1">{student.email || "-"}</td>
                  <td className="border px-2 py-1">
                    {student.phone_number || "-"}
                  </td>
                  <td className="border px-2 py-1">{student.address || "-"}</td>
                  <td className="border px-2 py-1">
                    {student.last_updated
                      ? new Date(student.last_updated).toLocaleString()
                      : "-"}
                  </td>
                  <td className="border px-2 py-1">
                    <button
                      className="text-blue-600 hover:underline mr-2"
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline mr-2"
                      onClick={() => onDelete(student.id!)}
                    >
                      Hapus
                    </button>
                    <button
                      className="text-gray-600 hover:underline"
                      onClick={() => onShowHistory(student)}
                    >
                      Riwayat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentList;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentCard from './StudentCard';
import { Student } from './StudentForm';

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

const StudentList = ({ students, onEdit, onDelete }: StudentListProps) => {
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
            <p className="text-sm text-gray-400">Tambahkan data siswa pertama Anda!</p>
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentList;

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Student } from "./StudentForm";

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

const StudentCard = ({ student, onEdit, onDelete }: StudentCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {student.name}
            </h3>
            <Badge variant="secondary" className="mb-2">
              {student.nim}
            </Badge>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">🎓 {student.major}</p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => onEdit(student)}
            variant="outline"
            size="sm"
            className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(student.nim)}
            variant="outline"
            size="sm"
            className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
          >
            Hapus
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;

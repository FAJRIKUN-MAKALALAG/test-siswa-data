import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import StudentForm, { Student } from "@/components/StudentForm";
import StudentList from "@/components/StudentList";
import ApplicationForm, {
  ApplicationFormData,
} from "@/components/ApplicationForm";
import ApplicationFormList, {
  ApplicationFormListItem,
} from "@/components/ApplicationFormList";
import StudentHistoryModal from "@/components/StudentHistoryModal";

const API_URL = "http://localhost:4000";

const Index = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [forms, setForms] = useState<ApplicationFormListItem[]>([]);
  const [editingForm, setEditingForm] =
    useState<ApplicationFormListItem | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [historyStudent, setHistoryStudent] = useState<Student | null>(null);

  // Fetch students from backend
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/students`);
      const data = await res.json();
      setStudents(data.filter(Boolean));
    } catch (err) {
      toast({
        title: "Gagal",
        description: "Gagal mengambil data siswa",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch application forms from backend
  const fetchForms = async () => {
    try {
      const res = await fetch(`${API_URL}/application_forms`);
      const data = await res.json();
      setForms(data.filter(Boolean));
    } catch (err) {
      toast({
        title: "Gagal",
        description: "Gagal mengambil data form",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchForms();
    // eslint-disable-next-line
  }, []);

  // Add or update student
  const handleAddStudent = async (studentData: Omit<Student, "id">) => {
    if (editingStudent) {
      try {
        const res = await fetch(`${API_URL}/students/${editingStudent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });
        if (!res.ok) throw new Error("Gagal update");
        setEditingStudent(null);
        toast({
          title: "Berhasil!",
          description: "Data siswa berhasil diperbarui.",
        });
        await fetchStudents();
      } catch {
        toast({
          title: "Gagal",
          description: "Gagal update data siswa",
          variant: "destructive",
        });
      }
    } else {
      try {
        const res = await fetch(`${API_URL}/students`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });
        if (!res.ok) throw new Error("Gagal tambah");
        toast({
          title: "Berhasil!",
          description: "Data siswa berhasil ditambahkan.",
        });
        await fetchStudents();
      } catch {
        toast({
          title: "Gagal",
          description: "Gagal menambah data siswa (NIM harus unik)",
          variant: "destructive",
        });
      }
    }
  };

  // Edit student (set form)
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete student
  const handleDeleteStudent = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/students/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal hapus");
      toast({
        title: "Berhasil!",
        description: "Data siswa berhasil dihapus.",
      });
      await fetchStudents();
      await fetchForms(); // update forms jika ada form milik siswa ini
    } catch {
      toast({
        title: "Gagal",
        description: "Gagal menghapus data siswa",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  // Add or update application form
  const handleAddForm = async (formData: ApplicationFormData) => {
    if (editingForm) {
      try {
        const res = await fetch(
          `${API_URL}/application_forms/${editingForm.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        if (!res.ok) throw new Error("Gagal update form");
        setEditingForm(null);
        toast({ title: "Berhasil!", description: "Form berhasil diperbarui." });
        await fetchForms();
      } catch {
        toast({
          title: "Gagal",
          description: "Gagal update form",
          variant: "destructive",
        });
      }
    } else {
      try {
        const res = await fetch(`${API_URL}/application_forms`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Gagal tambah form");
        toast({
          title: "Berhasil!",
          description: "Form berhasil ditambahkan.",
        });
        await fetchForms();
      } catch {
        toast({
          title: "Gagal",
          description: "Gagal menambah form (satu form per semester per siswa)",
          variant: "destructive",
        });
      }
    }
  };

  // Edit application form (set form)
  const handleEditForm = (form: ApplicationFormListItem) => {
    setEditingForm(form);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete application form
  const handleDeleteForm = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/application_forms/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal hapus form");
      toast({ title: "Berhasil!", description: "Form berhasil dihapus." });
      await fetchForms();
    } catch {
      toast({
        title: "Gagal",
        description: "Gagal menghapus form",
        variant: "destructive",
      });
    }
  };

  const handleShowHistory = async (student: Student) => {
    setHistoryStudent(student);
    setHistoryModalOpen(true);
    try {
      const res = await fetch(`${API_URL}/students/${student.id}/history`);
      const data = await res.json();
      setHistoryData(data);
    } catch {
      setHistoryData([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8 flex flex-col items-center gap-2">
          <div className="rounded-full bg-blue-200 w-16 h-16 flex items-center justify-center mb-2 shadow-lg">
            <span className="text-4xl">📚</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-1 tracking-tight">
            Sistem Manajemen Data Siswa & Pendaftaran Ulang
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
            Kelola data siswa dan pendaftaran ulang per semester dengan tampilan
            modern, responsif, dan mudah digunakan.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Siswa */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="sticky top-4 z-10">
              <StudentForm
                onSubmit={handleAddStudent}
                editingStudent={editingStudent}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="rounded-xl shadow-lg bg-white/80 p-4">
              <StudentList
                students={students}
                onEdit={handleEditStudent}
                onDelete={handleDeleteStudent}
                onShowHistory={handleShowHistory}
              />
            </div>
            <div className="rounded-xl shadow-lg bg-white/80 p-4">
              <ApplicationFormList
                forms={forms}
                students={students}
                onEdit={handleEditForm}
                onDelete={handleDeleteForm}
              />
            </div>
            <div className="rounded-xl shadow-lg bg-white/80 p-4">
              <ApplicationForm
                students={students}
                onSubmit={handleAddForm}
                key={editingForm ? editingForm.id : "new"}
                {...(editingForm ? { ...editingForm } : {})}
              />
            </div>
            {loading && (
              <div className="text-center text-gray-500">Loading...</div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 text-gray-500 text-sm">
          <p>© 2024 Sistem Manajemen Data Siswa & Pendaftaran Ulang</p>
        </div>
      </div>
      <StudentHistoryModal
        open={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        history={historyData}
      />
    </div>
  );
};

export default Index;

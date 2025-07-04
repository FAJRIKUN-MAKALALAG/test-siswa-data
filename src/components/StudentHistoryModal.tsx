import React from "react";

interface StudentHistoryModalProps {
  open: boolean;
  onClose: () => void;
  history: Array<{
    id: string;
    data_snapshot: any;
    changed_at: string;
    changed_by?: string;
  }>;
}

const StudentHistoryModal = ({
  open,
  onClose,
  history,
}: StudentHistoryModalProps) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-blue-700">
          Riwayat Perubahan Data Siswa
        </h2>
        {history.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            Belum ada riwayat perubahan.
          </div>
        ) : (
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Tanggal</th>
                <th className="border px-2 py-1">Nama</th>
                <th className="border px-2 py-1">Alamat</th>
                <th className="border px-2 py-1">Diubah Oleh</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td className="border px-2 py-1">
                    {new Date(item.changed_at).toLocaleString()}
                  </td>
                  <td className="border px-2 py-1">
                    {item.data_snapshot.name}
                  </td>
                  <td className="border px-2 py-1">
                    {item.data_snapshot.address}
                  </td>
                  <td className="border px-2 py-1">{item.changed_by || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentHistoryModal;

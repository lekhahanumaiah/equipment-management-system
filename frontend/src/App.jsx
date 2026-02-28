import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8080/api";

export default function App() {
  const [equipment, setEquipment] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    type: "",
    status: "",
    lastCleanedDate: "",
  });

  const [maintenance, setMaintenance] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [error, setError] = useState("");

  const types = ["Laptop", "Printer", "Scanner"];

  // Load equipment
  const loadEquipment = async () => {
    const res = await fetch(`${BASE_URL}/equipment`);
    const data = await res.json();
    setEquipment(data);
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  // Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.id) {
        await fetch(`${BASE_URL}/equipment/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch(`${BASE_URL}/equipment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      setForm({
        id: null,
        name: "",
        type: "",
        status: "",
        lastCleanedDate: "",
      });

      setError("");
      loadEquipment();
    } catch (err) {
      setError("Error saving equipment");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/equipment/${id}`, {
      method: "DELETE",
    });
    loadEquipment();
  };

  // Edit
  const handleEdit = (item) => {
    setForm(item);
  };

  // View Maintenance
  const viewMaintenance = async (item) => {
    setSelectedEquipment(item);

    const res = await fetch(
      `${BASE_URL}/equipment/${item.id}/maintenance`
    );
    const data = await res.json();
    setMaintenance(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 space-y-10">

      {/* FORM */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl">
        <h2 className="text-xl font-semibold mb-4">
          {form.id ? "Edit Equipment" : "Add Equipment"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Equipment Name"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <select
            className="w-full border p-2 rounded"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            required
          >
            <option value="">Select Type</option>
            {types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          <select
            className="w-full border p-2 rounded"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
            required
          >
            <option value="">Select Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Under Maintenance</option>
          </select>

          <input
            type="date"
            className="w-full border p-2 rounded"
            value={form.lastCleanedDate}
            onChange={(e) =>
              setForm({
                ...form,
                lastCleanedDate: e.target.value,
              })
            }
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {form.id ? "Update" : "Add"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Equipment List
        </h2>

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Last Cleaned</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {equipment.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.type}</td>
                <td className="border p-2">{item.status}</td>
                <td className="border p-2">
                  {item.lastCleanedDate}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => viewMaintenance(item)}
                  >
                    Maintenance
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MAINTENANCE HISTORY */}
      {selectedEquipment && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">
            Maintenance History - {selectedEquipment.name}
          </h2>

          {maintenance.length === 0 && (
            <p className="text-gray-500">No maintenance records</p>
          )}

          {maintenance.map((log) => (
            <div
              key={log.id}
              className="border p-3 rounded mb-2"
            >
              <p>Date: {log.maintenanceDate}</p>
              <p>Notes: {log.notes}</p>
              <p>Performed By: {log.performedBy}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
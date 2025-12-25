import "./App.css";
import { useState } from "react";
import axios from "axios";

const API_URL = "https://equipement-tracker-backend-3.onrender.com";
function App() {
  const [equipe, setEquipe] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("Machine");
  const [status, setStatus] = useState("Active");
  const [Cleaned, setCleaned] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setEquipe(response.data);
    } catch (error) {
      console.log("Error loading data:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const equipeData = { name, type, status, Cleaned };
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, equipeData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, equipeData);
      }
      setName("");
      setType("Machine");
      setStatus("Active");
      setCleaned("");
      fetchData();
    } catch (error) {
      alert("Error saving data");
      console.log(error)
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchData();
      } catch (error) {
        alert("Error deleting item");
      }
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setName(item.name);
    setType(item.type);
    setStatus(item.status);
    setCleaned(item.Cleaned.split("T")[0]);
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "red" }}>Equipement Tracker</h1>
      <form
        style={{
          maxWidth: "420px",
          margin: "30px auto",
          padding: "20px",
          border: "1px solid black",
        }}
        onSubmit={handleFormSubmit}
      >
        <h3 style={{ color: "blue" }}>
          {editingId ? "Update Equipment" : "Add New Equipment"}
        </h3>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Type: </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Machine">Machine</option>
          <option value="Vessel">Vessel</option>
          <option value="Tank">Tank</option>
          <option value="Mixer">Mixer</option>
        </select>
        <label>Status: </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
        <br />

        <label>Last Cleaned: </label>
        <input
          type="date"
          value={Cleaned}
          onChange={(e) => setCleaned(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">
          {editingId ? "Save Changes" : "Add Equipment"}
        </button>
        {editingId && (
          <button onClick={() => setEditingId(null)}>Cancel</button>
        )}
      </form>
      <hr />

      <h3>Equipment List</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Last Cleaned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipe.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.status}</td>
              <td>{new Date(item.Cleaned).toLocaleDateString()}</td>
              <td>
                <button onClick={() => startEdit(item)}>Edit</button>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;

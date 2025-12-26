import "./App.css";
import { useState , useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
function App() {
  const [equipe, setEquipe] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("Machine");
  const [status, setStatus] = useState("Active");
  const [cleaned, setCleaned] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      setEquipe(response.data.User);
    } catch (error) {
      console.log("Error loading data:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const equipeData = { name, type, status, lastCleaned: new Date(cleaned) };
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, equipeData);
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/`, equipeData);
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
    setCleaned(item.lastCleaned.split("T")[0]);
  };

  return (
    <div style={{  backgroundColor: "white", minHeight: "100vh", padding: "40px 20px", boxSizing: "border-box" }}>
      <h1 style={{ textAlign: "center", color: "red", marginBottom: "30px", fontSize: "2.5rem" }}>
        Equipment Tracker
      </h1>
      
      <form
        style={{
          maxWidth: "500px",
          margin: "0 auto 40px",
          padding: "30px",
          backgroundColor: "smokeywhite",
          borderRadius: "12px",
          border: "1px solid black",
        }}
        onSubmit={handleFormSubmit}
      >
        <h3 style={{ color: "Brown", marginTop: 0, marginBottom: "20px", fontSize: "1.5rem", borderBottom: "2px solid blue", paddingBottom: "10px", display: "inline-block" }}>
          {editingId ? "Update Equipment" : "Add New Equipment"}
        </h3>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "black", fontWeight: "600" }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid grey", fontSize: "16px", boxSizing: "border-box", outline: "none", transition: "border-color 0.2s" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "black", fontWeight: "600" }}>Type</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid black", fontSize: "16px", boxSizing: "border-box", backgroundColor: "white" }}
          >
            <option value="Machine">Machine</option>
            <option value="Vessel">Vessel</option>
            <option value="Tank">Tank</option>
            <option value="Mixer">Mixer</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "black", fontWeight: "600" }}>Status</label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid grey", fontSize: "16px", boxSizing: "border-box", backgroundColor: "white" }}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "black", fontWeight: "600" }}>Last Cleaned</label>
          <input
            type="date"
            value={cleaned}
            onChange={(e) => setCleaned(e.target.value)}
            required
            style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid white", fontSize: "16px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            type="submit"
            style={{ 
              flex: 1, 
              padding: "12px", 
              backgroundColor: "lightblue", 
              color: "black", 
              border: "none", 
              borderRadius: "6px", 
              fontSize: "16px", 
              fontWeight: "600", 
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,123,255,0.3)"
            }}
          >
            {editingId ? "Save Changes" : "Add Equipment"}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              onClick={() => setEditingId(null)}
              style={{ 
                padding: "12px 20px", 
                backgroundColor: "lightgrey", 
                color: "white", 
                border: "none", 
                borderRadius: "6px", 
                fontSize: "16px", 
                fontWeight: "600", 
                cursor: "pointer" 
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h3 style={{ color: "blue", marginBottom: "15px", fontSize: "1.5rem" }}>Equipment List</h3>
        <div style={{ overflowX: "auto", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)", backgroundColor: "white" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
            <thead>
              <tr style={{ backgroundColor: "white", textAlign: "left" }}>
                <th style={{ padding: "15px 20px", borderBottom: "2px solid white", color: "black" }}>Name</th>
                <th style={{ padding: "15px 20px", borderBottom: "2px solid white", color: "black" }}>Type</th>
                <th style={{ padding: "15px 20px", borderBottom: "2px solid white", color: "black" }}>Status</th>
                <th style={{ padding: "15px 20px", borderBottom: "2px solid white", color: "black" }}>Last Cleaned</th>
                <th style={{ padding: "15px 20px", borderBottom: "2px solid white", color: "black" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipe.map((item, index) => (
                <tr 
                  key={item._id} 
                  style={{ 
                    borderBottom: index !== equipe.length - 1 ? "1px solid white" : "none",
                    backgroundColor: index % 2 === 0 ? "white" : "white"
                  }}
                >
                  <td style={{ padding: "15px 20px", color: "grey" }}>{item.name}</td>
                  <td style={{ padding: "15px 20px", color: "lightgrey" }}>
                    <span style={{ 
                      padding: "4px 10px", 
                      borderRadius: "20px", 
                      backgroundColor: "white", 
                      color: "blue", 
                      fontSize: "0.85rem", 
                      fontWeight: "500" 
                    }}>
                      {item.type}
                    </span>
                  </td>
                  <td style={{ padding: "15px 20px", color: "grey" }}>
                    <span style={{ 
                      padding: "4px 10px", 
                      borderRadius: "20px", 
                      backgroundColor: item.status === 'Active' ? 'white' : item.status === 'Inactive' ? 'white' : 'white',
                      color: item.status === 'Active' ? 'green' : item.status === 'Inactive' ? 'red' : 'orange',
                       fontSize: "0.85rem", 
                      fontWeight: "500" 
                    }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: "15px 20px", color: "grey" }}>
                     {item.lastCleaned ? new Date(item.lastCleaned).toLocaleDateString() : "N/A"}
                  </td>
                  <td style={{ padding: "15px 20px" }}>
                    <button 
                      onClick={() => startEdit(item)}
                      style={{ 
                        marginRight: "8px", 
                        padding: "6px 12px", 
                        backgroundColor: "yellow", 
                        color: "black", 
                        border: "none", 
                        borderRadius: "4px", 
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "0.85rem"
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteItem(item._id)}
                      style={{ 
                        padding: "6px 12px", 
                        backgroundColor: "pink", 
                        color: "black", 
                        border: "none", 
                        borderRadius: "4px", 
                        cursor: "pointer",
                         fontWeight: "600",
                        fontSize: "0.85rem"
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {equipe.length === 0 && (
                 <tr>
                    <td colSpan="5" style={{ padding: "30px", textAlign: "center", color: "grey" }}>
                       No equipment found. Add some above!
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

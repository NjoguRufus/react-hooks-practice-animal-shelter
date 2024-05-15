import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

// Fetch pets from the API
const fetchPets = async (type) => {
  try {
    const res = await fetch(`http://localhost:3001/pets?type=${type}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching pets:", error);
    throw error;
  }
};

// App component
function App() {
  // State variables
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  const [loading, setLoading] = useState(false);

  // Fetch pets when filters change
  useEffect(() => {
    setLoading(true);
    fetchPets(filters.type)
      .then((data) => setPets(data))
      .finally(() => setLoading(false));
  }, [filters.type]);

  // Render the component
  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            {/* Pass the necessary props to the Filters component */}
            <Filters
              filters={filters}
              onChangeType={(type) => setFilters({ ...filters, type })}
            />
          </div>
          <div className="twelve wide column">
            {/* Pass necessary props to the PetBrowser component */}
            <PetBrowser pets={pets} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

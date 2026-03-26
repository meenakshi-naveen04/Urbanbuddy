import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();

  const services = [
    { name: "Plumber", path: "/plumbers" },
    { name: "Painter", path: "/painters" },
    { name: "Electrician", path: "/electricians" },
    { name: "Beautician", path: "/beauticians" },
    { name: "Cleaner", path: "/cleaners" },
    { name: "Tutor", path: "/tutors" },
    { name: "Security", path: "/security" },
    { name: "Home Nurse", path: "/nurse" }
  ];

  const [query, setQuery] = useState("");

  // refs for scrolling
  const refs = useRef({});

  const handleSearch = (value) => {
    setQuery(value);

    // find first matching service
    const match = services.find((s) =>
      s.name.toLowerCase().startsWith(value.toLowerCase())
    );

    if (match && refs.current[match.name]) {
      refs.current[match.name].scrollIntoView({ behavior: "smooth" });
    }
  };

  const filtered = services.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page">

      <h2>Search Services 🔍</h2>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Type service name..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-bar"
      />

      {/* RESULTS */}
      <div className="results">
        {filtered.map((s, i) => (
          <div
            key={i}
            ref={(el) => (refs.current[s.name] = el)}
            className="result-card"
            onClick={() => navigate(s.path)}
          >
            {s.name}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Search;
function SearchBar({ setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search services..."
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
export default SearchBar;
const Sorting = ({ sorting, setSorting }) => {
  const handleSortChange = (e) => {
    setSorting(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2">
      <h3 className="text-lg font-semibold">Sort by</h3>
      <select
        value={sorting}
        onChange={handleSortChange}
        className="px-4 py-2 border rounded-lg bg-dark-green text-white cursor-pointer"
      >
        <option value="">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="title-asc">Title: A to Z</option>
        <option value="title-desc">Title: Z to A</option>
      </select>
    </div>
  );
};

export default Sorting;

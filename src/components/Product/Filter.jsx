import { useSelector } from "react-redux";

const Filter = ({ filter, setFilter }) => {
  const categoriesArr = useSelector((state) => state.categories.array);

  const handleCategoryChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2">
      <h3 className="text-lg font-semibold">Filter by Category</h3>
      <select
        value={filter}
        onChange={handleCategoryChange}
        className="px-4 py-2 border rounded-lg bg-dark-green text-white cursor-pointer"
      >
        <option value="">All Categories</option>
        {categoriesArr.map((category, indx) => (
          <option key={indx} value={category}>
            {`${category[0].toUpperCase()}${category.slice(1)}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;

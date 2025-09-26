type Props = {
  q?: string;
  type?: "" | "rent" | "sale";
};

export default function SearchFilters({ q = "", type = "" }: Props) {
  return (
    <form className="card mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3" method="get" action="/browse">
      <input
        type="search"
        name="q"
        placeholder="Search by title or area"
        defaultValue={q}
        className="input"
      />
      <select name="type" defaultValue={type} className="select">
        <option value="">All types</option>
        <option value="rent">Rent (short stay & monthly)</option>
        <option value="sale">Buy</option>
      </select>
      <button type="submit" className="btn-primary">Apply</button>
    </form>
  );
}

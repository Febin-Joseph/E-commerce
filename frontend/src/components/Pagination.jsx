export default function Pagination({ page, totalPages, setPage }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => setPage(p)}
          style={{ fontWeight: p === page ? 'bold' : 'normal' }}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
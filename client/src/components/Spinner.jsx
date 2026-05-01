export default function Spinner({ size = 24, label }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-2 py-8"
    >
      <span
        className="inline-block animate-spin rounded-full border-2 border-gray-200 border-t-black"
        style={{ width: size, height: size }}
      />
      {label && <span className="text-sm text-gray-500">{label}</span>}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  );
}

export default function CategoryCard({
  categoryName,
}: {
  categoryName: string;
}) {
  return (
    <div className="bg-background/70 text-foreground flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
      <span>#</span>
      <span>{categoryName}</span>
    </div>
  );
}

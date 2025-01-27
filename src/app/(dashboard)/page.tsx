
export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 24 }).map((_, index) => (
        <div
          key={index}
          className="aspect-video h-12 w-full rounded-lg bg-muted/50"
        />
      ))}
    </div>
  );
}

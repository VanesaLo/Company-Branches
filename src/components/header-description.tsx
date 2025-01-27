type HeaderDescriptionProps = {
  title: string;
  description: string;
};
export default function HeaderDescription({title, description}: HeaderDescriptionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

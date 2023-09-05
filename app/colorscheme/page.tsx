import { Container } from "@/shared/components/Container";
import { Button } from "@/shared/components/ui/button";

function Square({ color }: { color: string }) {
  return <div className={`w-24 h-24 bg-${color}`}>{color}</div>;
}

export default function ColorSchemePage() {
  return (
    <Container className="min-h-[82.7vh]">
      <h2 className="text-2xl font-bold">Удалить на проде!</h2>
      <h1>Color Scheme</h1>
      <div className="flex gap-4 my-6 w-full flex-wrap">
        <Square color="bg-primary" />
        <Square color="bg-secondary" />
        <Square color="bg-accent text-black" />
        <Square color="bg-background" />
        <Square color="bg-foreground text-black" />
        <Square color="bg-popover" />
        <Square color="bg-success" />
        <Square color="bg-destructive" />
        <Square color="bg-destructive-foreground" />
      </div>
      <Button variant="outline">Hello world</Button>
    </Container>
  );
}

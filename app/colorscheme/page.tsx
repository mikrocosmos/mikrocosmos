import { Container } from "@/shared/components/Container";
import { Button } from "@/shared/components/ui/button";

export default function ColorSchemePage() {
  return (
    <Container className="min-h-[82.7vh]">
      <h2 className="text-2xl font-bold">Удалить на проде!</h2>
      <h1>Color Scheme</h1>
      <div className="flex gap-4 my-6 w-full flex-wrap">
        <div className="w-24 h-24 bg-primary">Primary</div>
        <div className="w-24 h-24 bg-secondary">Secondary</div>
        <div className="w-24 h-24 bg-accent text-black">Accent</div>
        <div className="w-24 h-24 bg-background">Background</div>
        <div className="w-24 h-24 bg-foreground text-black">Foreground</div>
        <div className="w-24 h-24 bg-popover">Popover</div>
        <div className="w-24 h-24 bg-success">Success</div>
        <div className="w-24 h-24 bg-destructive">Destructive</div>
        <div className="w-24 h-24 bg-destructive-foreground">
          Destructive-foreground
        </div>
      </div>
      <Button variant="outline">Hello world</Button>
    </Container>
  );
}

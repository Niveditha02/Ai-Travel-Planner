
import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-8 scroll-m-20 tracking-tight lg:text-5xl">
        Shadcn/ui + Tailwind v4
      </h1>
      <p className="mb-8 text-muted-foreground">
        If you see this styled nicely, Shadcn/ui is working!
      </p>
      <div className="flex gap-4">
        <Button onClick={() => alert("It works!")}>
          Click me
        </Button>
        <Button variant="outline">
          Secondary
        </Button>
        <Button variant="destructive">
          Destructive
        </Button>
      </div>
    </div>
  )
}

export default App

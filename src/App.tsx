import { useBearStore } from "@/stores/useBearStore";
import { Button } from "./components/ui/button";

function App() {
  const { bears, increase } = useBearStore();
  return (
    <div className="prose p-10">
      <main className="">
        <h1>Hello</h1>
        <h2>{bears}</h2>
        <Button onClick={() => increase(1)}>increase</Button>
      </main>
    </div>
  );
}

export default App;

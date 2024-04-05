import { Button } from "@/components/ui/button";
import { useBearStore } from "@/stores/useBearStore";

const HomePage = () => {
  const { bears, increase } = useBearStore();
  return (
    <div>
      <h1>Hello</h1>
      <h2>{bears}</h2>
      <Button onClick={() => increase(1)}>increase</Button>
    </div>
  );
};
export default HomePage;

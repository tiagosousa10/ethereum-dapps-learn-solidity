import CounterDapp from "./components/CounterDapp";
import { AppKitProvider } from "./providers/AppkitProvider";

function App() {
  return (
    <AppKitProvider>
      <CounterDapp />
    </AppKitProvider>
  );
}

export default App;

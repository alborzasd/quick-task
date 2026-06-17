import AppInitializer from "./init/AppInitializer";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";
import Main from "./layout/main/Main";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import UiStateProvider from "./providers/ui-state-provider/UiStateProvider";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <ReactQueryProvider>
      <UiStateProvider>
        <AppInitializer>
          <BrowserRouter>
            <Header />
            <Sidebar />
            <Main />
          </BrowserRouter>
        </AppInitializer>
        <Toaster richColors />
      </UiStateProvider>
    </ReactQueryProvider>
  );
}

export default App;

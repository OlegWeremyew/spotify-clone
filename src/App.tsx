import {TheHeader, TheMain, TheRegistration, TheSidebar, TheSidebarOverlay} from "./components";

export function App() {
  return (
    <>
      <div className="flex flex-grow overflow-auto">
        <TheSidebar />
        <TheSidebarOverlay />
        <div className="flex-1 overflow-auto">
          <TheHeader />
          <TheMain />
        </div>
      </div>
      <TheRegistration />
    </>
  );
}

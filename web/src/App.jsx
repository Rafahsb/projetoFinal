import { Navigations } from "./routes";
import VLibras from "@moreiraste/react-vlibras";
import "./styles/viewport.css";
export default function App() {
    return (
        <div>
            <VLibras forceOnload={false} />
            <Navigations />
        </div>
    );
}

import { Header } from "@/components/Header";
import { SheetProvider } from "@/providers/sheet-provider";

type Props = {
    children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <main className="px-3 lg:px-14">
                {children}
            </main>
            <SheetProvider />
        </>
    );
};

export default DashboardLayout;
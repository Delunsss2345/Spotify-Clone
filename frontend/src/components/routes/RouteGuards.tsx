import { useAuthStore } from "@/stores/useAuthStore";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    return children;
};

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAdmin, isLoading } = useAuthStore();
    if (!isAdmin && !isLoading) return <div>Unauthorized</div>
    return children;
};
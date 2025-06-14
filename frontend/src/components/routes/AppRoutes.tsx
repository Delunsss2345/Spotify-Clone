import { Routes, Route } from "react-router-dom"
import { PrivateRoute, PublicRoute } from "./RouteGuards"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import HomePage from "@/pages/home/HomePage";
import AuthCallBackPage from "@/pages/auth/AuthCallBackPage";
import MainLayout from "@/layouts/layout/MainLayout";
import ChatPage from "@/pages/chat/ChatPage";
import AlbumPage from "@/pages/album/AlbumPage";
import AdminPage from "@/pages/admin/AdminPage";
import { Toaster } from 'react-hot-toast'
import NotFoundPage from "@/pages/404/NotFoundPage";
const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={
                        <PublicRoute>
                            <HomePage />
                        </PublicRoute>
                    } />
                    <Route path="/chat" element={
                        <PublicRoute>
                            <ChatPage />
                        </PublicRoute>
                    } />
                    <Route path="/albums/:albumId" element={
                        <PublicRoute>
                            <AlbumPage />
                        </PublicRoute>
                    } />
                    <Route path="*" element={
                        <PrivateRoute>
                            <NotFoundPage />
                        </PrivateRoute>
                    } />
                </Route>
                <Route path="/sso-callback" element={
                    <PublicRoute>
                        <AuthenticateWithRedirectCallback
                            signUpForceRedirectUrl={"/auth-callback"}
                        />
                    </PublicRoute>
                } />
                <Route path="/auth-callback" element={
                    <PublicRoute>
                        <AuthCallBackPage />
                    </PublicRoute>
                } />
                <Route path="/admin" element={
                    <PrivateRoute>
                        <AdminPage />
                    </PrivateRoute>
                } />

            </Routes>
            <Toaster />
        </>
    )
}
export default AppRoutes;
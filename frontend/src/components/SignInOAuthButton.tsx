import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButton = () => {
    const { signIn, isLoaded } = useSignIn();
    if (!isLoaded) {
        return null;
    }

    // Hàm xử lý khi người dùng nhấn "Đăng nhập với Google"
    const signInWithGoogle = () => {
        signIn.authenticateWithRedirect({
            strategy: "oauth_google", // Sử dụng phương thức đăng nhập Google OAuth
            redirectUrl: "/sso-callback", // URL Clerk sẽ chuyển đến sau khi người dùng đăng nhập Google (bước trung gian)
            redirectUrlComplete: "/auth-callback" // Sau khi đăng nhập hoàn tất, Clerk sẽ chuyển hướng đến đây (ứng dụng của bạn sẽ xử lý người dùng tại đây)
        });
    };

    return <Button onClick={signInWithGoogle} variant={"secondary"} className="w-full text-white border-zinc-200 h-11 cursor-pointer">
        Continue with Google
    </Button>
}
export default SignInOAuthButton; 
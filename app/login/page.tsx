import { Suspense } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import  GoogleSignInButton from "@/components/sign-in";
import {
    CardDescription,
    CardHeader,
    CardTitle, 
} from "@/components/ui/card";
export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Async Dynamics Inc.
        </a>
        <CardHeader>
        <CardTitle className="flex justify-center text-2xl items-center">
          Login
        </CardTitle>
          <CardDescription className="flex justify-center">
            Login with Google, Apple, or Email
          </CardDescription>                         
        </CardHeader>
        <Suspense fallback={<div>Loading...</div>}>
          < GoogleSignInButton />
        </Suspense>
      </div>
    </div>
  );
}

// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle, 
// } from "@/components/ui/card";
// // import Link from "next/link";
// import GoogleSignInButton from "@/components/sign-in"; // Import the Client Component

// export default function Login() {
//     return (
//         <div className="flex h-screen w-full items-center justify-center px-4">
//             <div className="flex flex-col items-center"> {/* Ensures content is stacked and centered */}
//                 <Card className="w-[400px]">
//                     <CardHeader>
//                         <CardTitle className="text-2xl">Login</CardTitle>
//                         <CardDescription>
//                             Login with Google, GitHub, or Email
//                         </CardDescription>
//                     </CardHeader>
//                     {/* Use the GoogleSignInButton component */}
//                     <GoogleSignInButton />
//                     <CardContent>
//                         <form className="flex flex-col gap-y-4">
//                             <div className="flex flex-col gap-y-2">
//                                 <label>Email</label>
//                                 <input placeholder="hello@hello.com" className="border p-2 rounded"/>
//                                 {/* <label>Password</label>
//                                 <input placeholder="test12345" className="border p-2 rounded"/> */}
//                             </div>
//                             <Button>Submit</Button>
//                         </form>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// }

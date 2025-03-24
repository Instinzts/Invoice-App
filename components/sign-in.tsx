import { signIn } from "@/app/utils/auth"
import { Button } from "@/components/ui/button";
export default function SignIn() {
  return (
    <form
      action={async () => {
         "use server"
         await signIn("google", { redirectTo: "/dashboard" })
      }}
    >
      <Button className="w-full flex items-center gap-2" type="submit">Signin with Google</Button>
    </form>
  )
} 
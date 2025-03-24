import { signOut } from "@/app/utils/auth"
import { Button } from "@/components/ui/button";
export default function SignOut() {
  return (
<form
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/" })
      }}
    >
      <Button className="w-full flex items-center justify-center" type="submit">Sign Out</Button >
    </form>
  )
} 
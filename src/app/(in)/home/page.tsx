import { signout } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div>
      <h1>Page</h1>

      <Button onClick={signout}>Logout</Button>
    </div>
  );
}

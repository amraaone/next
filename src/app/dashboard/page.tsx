import { FunctionComponent } from "react"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  return (
    <div>
      DashboardUser<Button onClick={() => signOut()}>LogOUt</Button>
    </div>
  )
}

export default Dashboard

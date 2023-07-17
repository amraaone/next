"use client"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { FunctionComponent } from "react"

interface AdminProps {}

const Admin: FunctionComponent<AdminProps> = () => {
  const session = useSession()

  return (
    <div>
      admin
      <Button onClick={() => signOut()}>LogOUt</Button>
    </div>
  )
}

export default Admin

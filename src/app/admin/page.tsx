"use client"
import { useSession } from "next-auth/react"
import { FunctionComponent } from "react"

interface AdminProps {}

const Admin: FunctionComponent<AdminProps> = () => {
  const session = useSession()

  return <div>admin</div>
}

export default Admin

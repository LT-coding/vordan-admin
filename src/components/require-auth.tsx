import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
// import axiosClient from '@/services/axiosClient'
import { useUserStore } from '@/store/user'

export default function RequireAuth({
  children,
  allowedRoles = [],
  pageToNavigate = '/unauthorized',
}: {
  children: React.ReactNode
  allowedRoles?: string[]
  pageToNavigate?: string
}) {
  const name = useUserStore((state) => state.name)
  console.log('🚀 ~ file: require-auth.tsx:16 ~ name:', name)
  const role = useUserStore((state) => state.role)
  const setUserStateValue = useUserStore((state) => state.setUserStateValue)
  console.log(
    '🚀 ~ file: require-auth.tsx:18 ~ setUserStateValue:',
    setUserStateValue
  )

  // const getUser = () => {
  //   if (!name) {
  //     axiosClient('user').then((res) => {
  //       setUserStateValue('id', res.data.id)
  //       setUserStateValue('name', res.data.name)
  //       setUserStateValue('role', res.data.role)
  //       setUserStateValue('email', res.data.email)
  //     })
  //   }
  // }

  useEffect(() => {
    // getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // if (!name) return

  const defaultRoles = ['admin', 'developer']
  const roles = [...allowedRoles, ...defaultRoles]

  if (role && !roles.includes(role)) {
    return <Navigate to={pageToNavigate} />
  }

  return children
}

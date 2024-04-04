import React from 'react'
import SALocation from '../components/SuperAdmin/SALocation'
import ProtectedRoute from './ProtectedRoute'
import SAmainLayout from '../layouts/SuperAdmin/SAmainLayout'

export default function location() {
  return (
    <ProtectedRoute>
    <SAmainLayout>
     <SALocation/>
    </SAmainLayout>
  </ProtectedRoute>
  )
}

import SAAboutus from '@/src/components/SuperAdmin/SAAboutus'
import SAmainLayout from '@/src/layouts/SuperAdmin/SAmainLayout'
import React from 'react'
import ProtectedRoute from './ProtectedRoute'

export default function About_Us() {
  return (
    <ProtectedRoute>
   <SAmainLayout>
    <SAAboutus/>
   </SAmainLayout>
    </ProtectedRoute>
  )
}

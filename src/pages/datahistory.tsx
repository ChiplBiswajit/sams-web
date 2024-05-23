import React from 'react'
import ProtectedRoute from './ProtectedRoute'
import SAmainLayout from '../layouts/SuperAdmin/SAmainLayout'
import Datahistory from '../components/SuperAdmin/Datahistory'

export default function datahistory() {
  return (
    <ProtectedRoute>
        <SAmainLayout>
            <Datahistory/>
        </SAmainLayout>
    </ProtectedRoute>
   
  )
}

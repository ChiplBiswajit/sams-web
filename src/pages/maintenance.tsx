import React from 'react'
import SAmainLayout from '../layouts/SuperAdmin/SAmainLayout'
import ProtectedRoute from './ProtectedRoute'
import SAmaintenance from '../components/SuperAdmin/SAmaintenance'

export default function maintenance() {
    return (
        <ProtectedRoute>
            <SAmainLayout>
                <SAmaintenance />
            </SAmainLayout>
        </ProtectedRoute>

    )
}

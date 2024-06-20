import React from 'react'
import SAmainLayout from '../layouts/SuperAdmin/SAmainLayout'
import SAmaintenance from '../components/SuperAdmin/SAmaintenance'
import withAuth from '../utils/ProtectedRoute/withAuth';

 function maintenance() {
    return (
            <SAmainLayout>
                <SAmaintenance />
            </SAmainLayout>

    )
}
export default withAuth(maintenance);


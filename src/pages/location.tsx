import React from 'react'
import SALocation from '../components/SuperAdmin/SALocation'
import SAmainLayout from '../layouts/SuperAdmin/SAmainLayout'
import withAuth from '../utils/ProtectedRoute/withAuth';

 function location() {
  return (
    <SAmainLayout>
     <SALocation/>
    </SAmainLayout>
  )
}
export default withAuth(location);


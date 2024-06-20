import React from 'react'
import SAmainLayout from '../layouts/SuperAdmin/SAmainLayout'
import Datahistory from '../components/SuperAdmin/Datahistory'
import withAuth from '../utils/ProtectedRoute/withAuth'

 function datahistory() {
  return (
        <SAmainLayout>
            <Datahistory/>
        </SAmainLayout>
   
  )
}

export default withAuth(datahistory);

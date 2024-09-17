import React from 'react'
import useAuth from '../../hooks/validation'
import Fileup from '../dashboard/Fileup';

export default function AfterLogin() {

  const { authenticated , statusCode} = useAuth();
  
  if(!authenticated){
    return null; //Nothing renders
  }
  return (
    <div>
      <Fileup visibility={true} />
      LOGIN SUCCESSFUL <br /><br /><br />
    </div>
  )
}

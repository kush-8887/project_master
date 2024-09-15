import React from 'react'
import useAuth from '../../hooks/validation'

export default function AfterLogin() {

  const { authenticated , statusCode} = useAuth();
  
  if(!authenticated){
    return null; //Nothing renders
  }
  return (
    <div>
      LOGIN SUCCESSFUL
    </div>
  )
}

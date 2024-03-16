import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/header'

export default function FullLayout() {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

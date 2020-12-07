import React from 'react'
import Navigationbar from './Navigationbar'
import MainPage from './MainPage'


export default function Layout() {
    return (
        <div className="signinContainer">
            <Navigationbar />
            <MainPage />
        </div>
            

    )
}
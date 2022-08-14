import React, { ReactNode } from 'react';
import Footer from './footer/Footer';
import Navbar from './navbar/navbar';
import Sidebar from './sidebar/sidebar';


interface IlayoutProps {
    children : ReactNode;
}
const Layout = ({children} : IlayoutProps) => {
    return (
        <>
            {/* <Sidebar children={undefined}/> */}
            <Navbar/>

            {children}
            <Footer/>
        </>
    );
};

export default Layout;
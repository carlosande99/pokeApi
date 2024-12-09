import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import '../App.css';
import { Pie } from './Pie';
import { Link } from "react-router-dom";
function Dashboard() {
    const location = useLocation();
    return (
        <>
            <h1>Dashboard</h1>
            <p>{location.state}</p>
            <Pie/>
        </>
        

    )
}

export default Dashboard;
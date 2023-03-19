import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {

    const [dashboardData , setDashboardData] = useState([])
    const base_url= 'https://mlm-backend-drdz.onrender.com/';
    // const base_url= 'http://localhost:3001/';
    
    useEffect(()=>{
        axios.get(base_url + 'referrals/').then((response) => {
            
            setDashboardData(response);
        });
    },[])
    return (<>Hiii</>)
}

export default Dashboard;
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Diversity1Icon from '@mui/icons-material/Diversity1';
export const SidebarData = [
    {
        title:"Home",
        icon:<HomeIcon/>,
        link:"/home"
    },
    {
        title:"MailBox",
        icon:<EmailIcon/>,
        link:"/mailbox"
    },
    {
        title:"Analytics",
        icon:<AnalyticsIcon/>,
        link:"/analytics"
    },
    {
        title:"Dashboard",
        icon:<DashboardIcon/>,
        link:"/dashboard"
    },
    {
        title:"Friends",
        icon:<Diversity1Icon/>,
        link:"/friends"
    }
]
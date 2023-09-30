import { Routes, Route } from "react-router-dom";

import Requests from "../pages/Requests";
import Dashboard from "../pages/Dashboard";
import RequestDetail from "../pages/RequestDetails";
import NewRequest from "../pages/NewRequest";
import Account from "../pages/Account";
import Config from "../pages/Config";

function AppRoutes() {
    return (
        <Routes>
            <Route index element={<Requests />} />
            <Route path="requests" element={<Requests />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="request/:id" element={<RequestDetail />} />
            <Route path="new-request" element={<NewRequest />} />
            <Route path="account" element={<Account />} />
            <Route path="config" element={<Config />} />
            {/* special route to handle if none of the above match */}
            <Route path="*" element={<Requests />} />
        </Routes>
    );
}

export default AppRoutes;

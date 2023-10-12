import ResponsiveAppBar from "../components/nav/ResponsiveAppBar";

import ConfigActivityTypeTable from "../components/config/ConfigActivityTypeTable";
import ConfigStatusTable from "../components/config/ConfigStatusTypeTable";
import ConfigUserRoleTypeTable from "../components/config/ConfigUserRoleTypeTable";

function Config() {
    return (
        <>
            <ResponsiveAppBar />
            <br />
            <ConfigActivityTypeTable />
            <ConfigStatusTable />
            <ConfigUserRoleTypeTable />
        </>
    );
}

export default Config;

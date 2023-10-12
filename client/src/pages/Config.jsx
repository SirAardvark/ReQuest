import ResponsiveAppBar from "../components/ResponsiveAppBar";

import ConfigActivityTypeTable from "../components/ConfigActivityTypeTable";
import ConfigStatusTable from "../components/ConfigStatusTypeTable";
import ConfigUserRoleTypeTable from "../components/ConfigUserRoleTypeTable";

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

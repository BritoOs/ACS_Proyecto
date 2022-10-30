import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Leagues from './leagues/Leagues';

function Dashboard({userID}) {
     return (
        <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3"
        justify
        >
        <Tab eventKey="league" title="Ligas">
            <Leagues userID={userID} />
        </Tab>
        <Tab eventKey="points" title="Puntos" disabled>
            <h1>Hello!!!!</h1>
        </Tab>
        </Tabs>
    );
}

export default Dashboard;
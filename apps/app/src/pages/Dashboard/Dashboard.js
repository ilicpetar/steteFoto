import React from 'react';
import Panel from '@gef-ui/components/organisms/Panel';
import { getLabelMessage } from '@gef-ui/localization/messages';

const Dashboard = () => <Panel heading={getLabelMessage('pages:dashboard')} />;

export default Dashboard;

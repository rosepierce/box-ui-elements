/**
 * @flow
 * @file Preview sidebar nav button component
 * @author Box
 */

import * as React from 'react';
import { Route } from 'react-router-dom';
import NavButton from '../common/nav-button';
import Tooltip from '../../components/tooltip/Tooltip';
import './SidebarNavButton.scss';

type Props = {
    'data-resin-target'?: string,
    'data-testid'?: string,
    children: React.Node,
    isOpen?: boolean,
    sidebarView: string,
    tooltip: React.Node,
};

const SidebarNavButton = ({
    children,
    'data-resin-target': dataResinTarget,
    'data-testid': dataTestId,
    isOpen,
    sidebarView,
    tooltip,
}: Props) => {
    const sidebarPath = `/${sidebarView}`;

    return (
        <Route path={sidebarPath}>
            {({ match }) => {
                const isMatch = !!match;
                const isActive = () => isMatch && !!isOpen;
                const isToggle = isMatch && match.isExact;
                const sidebarState = { open: isToggle ? !isOpen : true };

                return (
                    <Tooltip position="middle-left" text={tooltip}>
                        <NavButton
                            aria-selected={isActive()}
                            activeClassName="bcs-is-selected"
                            className="bcs-NavButton"
                            data-resin-target={dataResinTarget}
                            data-testid={dataTestId}
                            isActive={isActive}
                            replace={isToggle}
                            role="tab"
                            to={{
                                pathname: sidebarPath,
                                state: sidebarState,
                            }}
                            type="button"
                        >
                            {children}
                        </NavButton>
                    </Tooltip>
                );
            }}
        </Route>
    );
};

export default SidebarNavButton;

import React from 'react';
import { Link } from 'react-router-dom';

function FeedNav(props) {
    return (
        <nav className="feed-nav">
            <ul className="flex justify-start">
                <li className="feed-nav-item" onClick={() => props.removeTab()}>
                    <Link className={props.activeTab === "" ? 'active' : undefined} to="/">
                        Global Feed
                    </Link>
                </li>
                {props.activeTab && (
                    <li className="feed-nav-item">
                    <Link className={props.activeTab && 'active'} to="/">
                        # {props.activeTab}
                    </Link>
                </li>
                )}
            </ul>
        </nav>
    )
}
export default FeedNav;
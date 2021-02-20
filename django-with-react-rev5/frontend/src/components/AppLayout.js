import React from 'react';
import './AppLayout.scss';
import StoryList from './StoryList';
import SuggestionList from './SuggestionList';
import { Input, Menu } from 'antd';
import logo from'assets/logo.png';

function AppLayout({ children }) {

    return (
        <div className="app">
            <div className="header">
                <div className="page-title">
                    <img src={logo} alt='logo' style={{ width:'150px' }} />
                </div>
                <div className="search"><Input.Search /></div>
                <div className="topnav">
                    <Menu mode="horizontal">
                        <Menu.Item>Menu1</Menu.Item>
                        <Menu.Item>Menu2</Menu.Item>
                        <Menu.Item>Menu3</Menu.Item>
                    </Menu>
                </div>
            </div>
            <div className="contents">{children}</div>
            <div className="sidebar">
                <StoryList style={{ marginBottom: '1rem' }} />
                <SuggestionList />
            </div>
            <div className="footer">
                &copy; 2021, Ahn Jun Young.
            </div>
        </div>
    );
}

export default AppLayout;
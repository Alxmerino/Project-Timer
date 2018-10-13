import React, { Component } from 'react';
// import * as PropTypes from 'prop-types';

// Core
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';

// Others
import moment from 'moment';

interface IState {
    loggedIn: boolean,
    menuOpen: boolean
}
interface IProps {
    classes: any;
    [index:string]: any;
}

const styles = {
    toolbar: {
        justifyContent: 'space-between',
    }
};

class Header extends Component<IProps, IState, any> {
    public state = {
        loggedIn: false,
        menuOpen: false
    }

    public render() {
        const { classes } = this.props;
        const { menuOpen, loggedIn } = this.state;

        return (

            <div>
                <AppBar position="static">
                    <Toolbar className={ classes.toolbar }>
                        {/* Home Button */}
                        <IconButton className="header-home-icon" color="inherit" aria-label="Menu">
                            <HomeIcon />
                        </IconButton>

                        {/* Current Time */}
                        <Typography variant="title" color="inherit">{this.today()}</Typography>

                        {/* User/Login */}
                        {loggedIn ? (
                            <div>
                                <IconButton
                                  aria-haspopup="true"
                                  color="inherit"
                                  onClick={this.handleOpen}
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-user"
                                    anchorOrigin={{
                                        horizontal: 'right',
                                        vertical: 'top',
                                    }}
                                    transformOrigin={{
                                        horizontal: 'right',
                                        vertical: 'top',
                                    }}
                                    open={menuOpen}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleLogOut}>Logout</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <div>
                                <Button color="inherit" onClick={this.handleLogIn}>Login</Button>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    private today() {
        return `Today, ${moment().format('MMM Do')}`;
    }

    private handleOpen = () => {
        this.setState({menuOpen: true});
    }

    private handleClose = () => {
        this.setState({menuOpen: false});
    }

    private handleLogIn = () => {
        this.setState({loggedIn: true});
    }

    private handleLogOut = () => {
        this.setState({
            loggedIn: false,
            menuOpen: false,
        });
    }
}

export default withStyles(styles)(Header);

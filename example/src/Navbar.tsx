import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar as RSNavbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <RSNavbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">
        react-scrollable-canvas
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/examples">
              Examples
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/docs">
              Docs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/solt9029/react-scrollable-canvas" target="_blank">
              GitHub
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </RSNavbar>
  );
};

export default Navbar;

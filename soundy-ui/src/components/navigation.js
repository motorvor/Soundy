import React from 'react';

import { Navbar, NavbarGroup, NavbarDivider, NavbarHeading, Alignment, Button, Classes } from "@blueprintjs/core";

export default function Navigation() {
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>Soundy</NavbarHeading>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon="home" text="Home" />
        <Button className={Classes.MINIMAL} icon="document" text="Uploads" />
      </NavbarGroup>
    </Navbar>
  )
}
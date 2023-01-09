import React from "react";
import { Route, Routes } from "react-router-dom";
import { Routing } from "./Routing";

import Landing from "./structure/Landing";
import Layout from "./structure/Layout"
import { Cars, Dashboard, Drivers, Invoices, Owners, Settings } from "./pages/apps";
import { Login} from "./pages/landing";

export default () => (
  <Routes>
    <Route element={<Landing/>}>
      {/* <Route path={Routing.Home.path} element={<Home/>}/> */}
      <Route path={Routing.Login.path} element={<Login />} />

    </Route>
    <Route element={<Layout/>}>
      <Route exact path={Routing.Dashboard.path} element={<Dashboard />} />
      <Route exact path={Routing.Drivers.path} element={<Drivers />} />
      <Route exact path={Routing.Owner.path} element={<Owners />} />
      <Route exact path={Routing.Car.path} element={<Cars />} />
      <Route exact path={Routing.Invoices.path} element={<Invoices />} />
      <Route exact path={Routing.Settings.path} element={<Settings />} />
    </Route>
  </Routes>
);

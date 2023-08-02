import React from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../Pages/404/PageNotFound";
import Confirm from "../Pages/Confirm/Confirm";
import Confirmation from "../Pages/Confirmation/Confirmation";
import Dl from "../Pages/Dl/Dl";
import House from "../Pages/Home/House";
import Liveliness from "../Pages/LivlinessTest/Liveliness";
import ScanPhoto from "../Pages/ScanPhoto/ScanPhoto";
import SelectDoc from "../Pages/SelectDoc/SelectDoc";
import Selfie from "../Pages/Selfie/Selfie";
import Completed from "../Pages/Confirm/Completed";

const Router = () => (
  <Routes>
    <Route path="/:id" element={<House />} />
    <Route path="/verification/:id" exact="true" element={<ScanPhoto />} />
    <Route path="/face-verification" exact="true" element={<Selfie />} />
    <Route path="/liveliness-test" exact="true" element={<Liveliness />} />
    <Route path="/confirmation" exact="true" element={<Confirmation />} />
    <Route path="/select-document" exact="true" element={<SelectDoc />} />
    <Route path="/dl-verification" exact="true" element={<Dl />} />
    <Route path="/confirm-verification" exact="true" element={<Confirm />} />
    <Route path="/completed" exact="true" element={<Completed />} />
    <Route path="*" exact="true" element={<PageNotFound />} />
  </Routes>
);

export default Router;

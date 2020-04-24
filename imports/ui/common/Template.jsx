import React from "react";
import DayjsAdapter from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const Template = ({ Header, Content, Footer }) => {
  return (
    <>
      <MuiPickersUtilsProvider utils={DayjsAdapter}>
        <Header />
        <Content />
        <Footer />
      </MuiPickersUtilsProvider>
    </>
  );
};

export default Template;

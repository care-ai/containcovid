import React from "react";
import { Meteor } from "meteor/meteor";

import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import {
  FlowRouterMeta,
  FlowRouterTitle,
} from "meteor/ostrio:flow-router-meta";
import { AccountsReactComponent } from "meteor/meteoreact:accounts";
import { mount } from "react-mounter";
import toastr from "../ui/common/toastr";
import { setButtonState } from "../ui/common/utils";

import Header from "../ui/common/Header";
import Footer from "../ui/common/Footer";
import ContentWrapper from "../ui/common/ContentWrapper";
import Template from "../ui/common/Template";

import Index from "../ui/indexPage/Index";
import DataManagementPage from "../ui/dataManagement/DataManagementPage";
import DataImportPage from "../ui/dataManagement/DataImportPage";

import { AccountsReact } from "meteor/meteoreact:accounts";
import TutorialPage from "../ui/TutorialPage";
import DataManualAddPage from "../ui/dataManagement/DataManualAddPage";
import PatientPage from "../ui/common/patient/Patient";
import RiskAssessmentPage from "../ui/RiskAssesmentPsge/RiskAssesmentPage";
import MapPage from "../ui/MapPage/MapPage";

AccountsReact.configure({});

const scrollToTop = () => {
  setTimeout(() => {
    if (!window.location.hash) {
      window.scroll(0, 0);
    }
  }, 25);
};

FlowRouter.triggers.enter([scrollToTop]);

//main route
FlowRouter.route("/", {
  name: "index",
  triggersEnter: [() => setButtonState("manage-link")],
  action() {
    mount(Template, {
      Header: Header,
      Content: Index,
      Footer: Footer,
    });
  },
});

FlowRouter.route("/tutorial", {
  name: "tutorial",
  triggersEnter: [() => setButtonState("manage-link")],

  action() {
    mount(Template, {
      Header: Header,
      Content: TutorialPage,
      Footer: Footer,
    });
  },
});

FlowRouter.route("/manage-data", {
  name: "manage-data",

  action() {
    mount(Template, {
      Header: Header,
      Content: DataManagementPage,
      Footer: Footer,
    });
  },
  script: () => ({
    gmaps:
      "https://maps.googleapis.com/maps/api/js?key=" +
      Meteor.settings.public.googleMapsAPIKey +
      "&libraries=places",
  }),

});

FlowRouter.route("/map", {
  name: "map",

  action() {
    mount(Template, {
      Header: Header,
      Content: MapPage,
      Footer: Footer,
    });
  },
});

FlowRouter.route("/risk-assessment", {
  name: "risk-assessment",
  action() {
    mount(Template, {
      Header: Header,
      Content: RiskAssessmentPage,
      Footer: Footer,
    });
  },
  script: () => ({
    gmaps:
      "https://maps.googleapis.com/maps/api/js?key=" +
      Meteor.settings.public.googleMapsAPIKey +
      "&libraries=places",
  }),

});

FlowRouter.route("/import-data", {
  name: "import-data",

  action() {
    mount(Template, {
      Header: Header,
      Content: DataImportPage,
      Footer: Footer,
    });
  },
  script: () => ({
    gmaps:
      "https://maps.googleapis.com/maps/api/js?key=" +
      Meteor.settings.public.googleMapsAPIKey +
      "&libraries=places",
  }),

});

FlowRouter.route("/input-data", {
  name: "input-data",

  action() {
    mount(Template, {
      Header: Header,
      Content: DataManualAddPage,
      Footer: Footer,
    });
  },
  script: () => ({
    gmaps:
      "https://maps.googleapis.com/maps/api/js?key=" +
      Meteor.settings.public.googleMapsAPIKey +
      "&libraries=places",
  }),

});

FlowRouter.route("/patient", {
  name: "patient",
  triggersEnter: [() => setButtonState("manage-link")],

  action() {
    mount(Template, {
      Header: Header,
      Content: PatientPage,
      Footer: Footer,
    });
  },
});

//accounts routes
const paths = {
  "/sign-in": "signIn",
  "/sign-up": "signUp",
  "/forgot-password": "forgotPwd",
  "/change-password": "changePwd",
  "/reset-password/:token": "resetPwd", //Bug in accounts-react-UI, it does not set the state correctly on tokenized paths
  "/resend-verification": "resendVerification",
};

for (let [p, s] of Object.entries(paths)) {
  FlowRouter.route(p, {
    action(params, queryParams) {
      mount(Template, {
        Header: Header,
        Content: () => (
          <ContentWrapper sectionClass="arform" center={false}>
            <AccountsReactComponent route={p} token={params.token} state={s} />
          </ContentWrapper>
        ),
        Footer: Footer,
      });
    },
  });
}

FlowRouter.route("/verify-email/:token", {
  name: "verify-email",
  action(params) {
    Accounts.verifyEmail(params.token, (error) => {
      if (error) {
        FlowRouter.go("/");
        toastr.error(error.reason, "Email token not valid");
      } else {
        FlowRouter.go("/manage-data");
        toastr.success("Email verified! Thanks!", "success");
      }
    });
  },
});

new FlowRouterMeta(FlowRouter);

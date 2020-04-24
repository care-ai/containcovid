import { Meteor } from "meteor/meteor";
import "../imports/both/startup";
import "../imports/routes/routes";
import Modal from "react-modal";

Modal.setAppElement("#react-root");

Meteor.startup(() => {});

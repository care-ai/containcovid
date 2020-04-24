import PubSub from "pubsub-js";

const allowedButtonStates = [
  "manage-link",
  "manage-save",
  "share-data",
  "risk-assessment",
  "sign-up",
];

export const setButtonState = (state) => {
  if (allowedButtonStates.includes(state))
    PubSub.publish("SET_TOP_BUTTON_STATE", state);
  else throw new Meteor.Error("Incorrect state");
};

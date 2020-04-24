import { Meteor } from "meteor/meteor";
import { AccountsReact } from "meteor/meteoreact:accounts";
import { Accounts } from 'meteor/accounts-base'

import "../imports/api/methods/visits";
import "../imports/api/methods/diagnosis";
import "../imports/api/methods/removeData";
import "../imports/api/publications/visits";
import "../imports/api/publications/diagnosis";
import "../imports/both/startup";
import "../imports/ui/email/Templates";

Meteor.startup(function () {
  if (Meteor.settings && Meteor.settings.smtp) {
    const { userName, password, host, port, isSecure } = Meteor.settings.smtp;
    const scheme = isSecure ? "smtps" : "smtp";
    process.env.MAIL_URL = `${scheme}://${encodeURIComponent(
      userName
    )}:${encodeURIComponent(password)}@${host}:${port}`;
  }
});

Accounts.config({
  sendVerificationEmail: true

});

Meteor.startup(() => {});

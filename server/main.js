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

  BrowserPolicy.framing.disallow();
  BrowserPolicy.content.allowInlineScripts();
  BrowserPolicy.content.allowSameOriginForAll();
  BrowserPolicy.content.allowFontDataUrl();

  const trustedOrigins = [
    "https://cdnjs.cloudflare.com/",
    "https://*.googleapis.com/",
    "https://d3e54v103j8qbb.cloudfront.net/",
  ];

  let index = 0;
  while (index < trustedOrigins.length) { 
    let origin = trustedOrigins[index];
    BrowserPolicy.content.allowOriginForAll(origin);
    index++;
  }

});

Accounts.config({
  sendVerificationEmail: true

});


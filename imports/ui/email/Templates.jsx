Accounts.emailTemplates.from = "Contain Covid <info@containcovid.com>";
Accounts.emailTemplates.siteName = 'Contain Covid';
// override for verification emails
Accounts.emailTemplates.verifyEmail = {
  subject(user) {
     return "Contain Covid: Verify your email address";
  },
  text(user, url) {
    url = url.replace( "#/", "" );
    return "To verify your e-mail, visit the following link:" + url + "\n\n If you did not sign up for a Contain Covid account, please disregard this email or contact info@containcovid.org";
  }
};

Accounts.emailTemplates.resetPassword = {
  subject(user) {
     return "Contain Covid: How to reset your password ";
  },
  text(user, url) {
    url = url.replace( "#/", "" );
    return "To reset your password, visit the following link: ${url} \n\n If you did not sign up for a Contain Covid account, please disregard this email or contact info@containcovid.org\n\n Thank You, \n\n - The Contain Covid Team";
  }
};

Accounts.emailTemplates.enrollAccount = {
  subject(user) {
     return "Contain Covid: An account has been created for you";
  },
  text(user, url) {
    url = url.replace( "#/", "" );
    return "To star using Contain Covid, visit the following link: ${url} \n\n If you did not sign up for a Contain Covid account, please disregard this email or contact our support team at info@containcovid.org\n\n Thank You, \n\n - The Contain Covid Team";
  }
};
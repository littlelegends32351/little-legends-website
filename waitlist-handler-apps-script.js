// Little Legends Learning Loft — Waitlist Form Handler
// Deploy as Web App (Execute as: Me, Access: Anyone) and paste the /exec URL
// into index.html replacing WAITLIST_SCRIPT_URL.

function doPost(e) {
  var p = e.parameter;
  var parentName = p['parent-name'] || '';
  var phone = p['phone'] || '';
  var email = p['email'] || '';
  var childName = p['child-name'] || '';
  var childDob = p['child-dob'] || '';
  var startDate = p['start-date'] || '';
  var hearAbout = p['hear-about'] || '';

  var myEmail = Session.getEffectiveUser().getEmail();

  // 1. Notification to Iris
  var notifySubject = 'New Waitlist Signup: ' + parentName;
  var notifyBody = 'A new family joined the waitlist on legendschildcare.com\n\n'
    + 'Parent/Guardian: ' + parentName + '\n'
    + 'Phone: ' + phone + '\n'
    + 'Email: ' + email + '\n'
    + 'Child Name: ' + childName + '\n'
    + 'Child Birthdate: ' + childDob + '\n'
    + 'Desired Start: ' + (startDate || 'Not specified') + '\n'
    + 'Heard about us: ' + (hearAbout || 'Not specified') + '\n\n'
    + 'Reminder: follow up promptly — waitlist families expect to hear back quickly.';
  GmailApp.sendEmail(myEmail, notifySubject, notifyBody, {name: 'Little Legends Learning Loft'});

  // 2. Confirmation to the parent
  var parentFirst = parentName.split(' ')[0] || 'there';
  var subject = 'You are on the Little Legends waitlist!';
  var plainBody =
    'Hi ' + parentFirst + '!\n\n'
    + 'Thank you for joining the Little Legends Learning Loft waitlist. We are so excited that you are considering us for ' + childName + '.\n\n'
    + 'Spots are limited, and we will reach out the moment a space is ready for your family. If you have any questions in the meantime, just reply to this email or call us at 850-627-4061.\n\n'
    + 'From First Steps to Lifelong Success.\n\n'
    + 'With love from our village,\n\n'
    + 'Iris\n'
    + 'Founder and Director\n'
    + 'Little Legends Learning Loft\n'
    + '803 E. Jefferson St. | Quincy, FL 32351\n'
    + 'www.legendschildcare.com';
  if (email) {
    GmailApp.sendEmail(email, subject, plainBody, {name: 'Little Legends Learning Loft', replyTo: myEmail});
  }
  return HtmlService.createHtmlOutput('<script>window.top.location.href="https://legendschildcare.com/pages/thank-you.html";</script>');
}

function testAuth() {
  GmailApp.sendEmail(Session.getEffectiveUser().getEmail(), 'Auth Test', 'If you get this, authorization works.');
}

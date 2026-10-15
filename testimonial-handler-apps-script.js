// Little Legends Learning Loft — Testimonial Submission Handler
// Deploy as Web App (Execute as: Me, Access: Anyone) and paste the /exec URL
// into index.html replacing TESTIMONIAL_SCRIPT_URL.
// NOTE: Testimonials are emailed to Iris for review. Nothing auto-publishes.

function doPost(e) {
  var p = e.parameter;
  var name = p['name'] || '';
  var email = p['email'] || '';
  var testimonial = p['testimonial'] || '';

  var myEmail = Session.getEffectiveUser().getEmail();

  var notifySubject = 'New Testimonial Submission: ' + name;
  var notifyBody = 'A new testimonial was submitted on legendschildcare.com\n\n'
    + 'Name: ' + name + '\n'
    + 'Email: ' + email + ' (not for publishing)\n\n'
    + 'Testimonial:\n"' + testimonial + '"\n\n'
    + '---\n'
    + 'Review before publishing. To add it to the site, paste it into the '
    + 'testimonial-grid section of index.html as a new testimonial-card.';
  GmailApp.sendEmail(myEmail, notifySubject, notifyBody, {name: 'Little Legends Learning Loft'});

  // Thank-you to the submitter
  var first = name.split(' ')[0] || 'there';
  var subject = 'Thank you for sharing your experience!';
  var plainBody =
    'Hi ' + first + '!\n\n'
    + 'Thank you for sharing your Little Legends experience. Your words mean the world to us, and to the families still deciding.\n\n'
    + 'Our team reviews every testimonial before it appears on the site. We will be in touch if we have any questions.\n\n'
    + 'From First Steps to Lifelong Success.\n\n'
    + 'With love from our village,\n\n'
    + 'Iris\n'
    + 'Founder and Director\n'
    + 'Little Legends Learning Loft';
  if (email) {
    GmailApp.sendEmail(email, subject, plainBody, {name: 'Little Legends Learning Loft', replyTo: myEmail});
  }
  return ContentService.createTextOutput('ok');
}

function testAuth() {
  GmailApp.sendEmail(Session.getEffectiveUser().getEmail(), 'Auth Test', 'If you get this, authorization works.');
}

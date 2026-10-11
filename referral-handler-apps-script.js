function doPost(e) {
  var p = e.parameter;
  var referrerName = p['referrer-name'] || '';
  var referrerPhone = p['referrer-phone'] || '';
  var friendName = p['friend-name'] || '';
  var friendEmail = p['email'] || '';

  var myEmail = Session.getEffectiveUser().getEmail();

  // 1. Notification to Iris
  var notifySubject = 'New Legend Referral: ' + referrerName;
  var notifyBody = 'A new referral was submitted on legendschildcare.com\n\n'
    + 'Referrer Name: ' + referrerName + '\n'
    + 'Referrer Phone: ' + referrerPhone + '\n'
    + 'Friend Name: ' + friendName + '\n'
    + 'Friend Email: ' + friendEmail + '\n\n'
    + 'Reminder: log this in the Referral Tracker in Legends Mission Control Master.';
  GmailApp.sendEmail(myEmail, notifySubject, notifyBody, {name: 'Little Legends Learning Loft'});

  // 2. Prospect email
  var referrerFirst = referrerName.split(' ')[0] || 'A friend';
  var subject = referrerFirst + ' has a childcare recommendation for you!';

  var firstName = friendName.split(' ')[0] || 'there';

  var htmlBody =
    '<div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">' +
    '<p style="font-size:16px;">Hi ' + firstName + '!</p>' +
    '<p style="font-size:16px;"><strong>Someone in your village thinks we should meet!</strong></p>' +
    '<p style="font-size:16px;">' + referrerName + ' thought of your family and wanted to introduce you to <strong>Little Legends Learning Loft</strong>, a childcare and early learning center in Quincy, Florida.</p>' +
    '<p style="font-size:16px;">We believe childhood should be filled with discovery, laughter, meaningful connections, and opportunities to grow. That\'s why Little Legends is designed to be a place where every child is encouraged to explore, build confidence, and discover what makes them a Legend.</p>' +
    '<p style="font-size:16px;"><strong>And we\'d love for your little one to be part of our story!</strong></p>' +
    '<p style="font-size:16px;">Whether you\'re exploring childcare options now or planning ahead, we invite you to get to know us, discover our programs, and see what makes the Little Legends experience special.</p>' +
    '<p style="text-align:center;margin:28px 0;">' +
    '<a href="https://www.legendschildcare.com" style="display:inline-block;background:#2B9FE3;color:#ffffff;text-decoration:none;font-weight:bold;padding:16px 36px;border-radius:40px;font-size:16px;box-shadow:0 6px 0 #1B7FC1, 0 10px 20px rgba(0,0,0,0.3);">Discover the Little Legends Experience</a>' +
    '</p>' +
    '<p style="font-size:16px;">Have questions? We\'d love to hear from you! Simply reply to this email, and someone from our Little Legends team will be happy to help.</p>' +
    '<p style="font-size:16px;"><strong>From First Steps to Lifelong Success.</strong></p>' +
    '<p style="font-size:16px;">With love from our village,</p>' +
    '<p style="font-size:16px;"><strong>Iris</strong><br>' +
    'Founder and Director<br>' +
    '<strong>Little Legends Learning Loft</strong><br>' +
    '803 E. Jefferson St. | Quincy, FL 32351<br>' +
    '850-627-4061<br>' +
    '<a href="https://www.legendschildcare.com" style="color:#2B9FE3;">www.legendschildcare.com</a><br>' +
    '<a href="mailto:leadership@littlelegendsloft.com" style="color:#2B9FE3;">leadership@littlelegendsloft.com</a></p>' +
    '<p style="font-size:14px; font-style:italic; color:#2B9FE3;">Building confident, kind, and lifelong learners, one Little Legend at a time.</p>' +
    '</div>';

  var plainBody =
    'Hi ' + firstName + '!\n\n' +
    'Someone in your village thinks we should meet!\n\n' +
    referrerName + ' thought of your family and wanted to introduce you to Little Legends Learning Loft, a childcare and early learning center in Quincy, Florida.\n\n' +
    'We believe childhood should be filled with discovery, laughter, meaningful connections, and opportunities to grow. That is why Little Legends is designed to be a place where every child is encouraged to explore, build confidence, and discover what makes them a Legend.\n\n' +
    'And we would love for your little one to be part of our story!\n\n' +
    'Whether you are exploring childcare options now or planning ahead, we invite you to get to know us, discover our programs, and see what makes the Little Legends experience special.\n\n' +
    'Discover the Little Legends Experience: https://www.legendschildcare.com\n\n' +
    'Have questions? We would love to hear from you! Simply reply to this email, and someone from our Little Legends team will be happy to help.\n\n' +
    'From First Steps to Lifelong Success.\n\n' +
    'With love from our village,\n\n' +
    'Iris\n' +
    'Founder and Director\n' +
    'Little Legends Learning Loft\n' +
    '803 E. Jefferson St. | Quincy, FL 32351\n' +
    '850-627-4061\n' +
    'www.legendschildcare.com\n' +
    'leadership@littlelegendsloft.com\n\n' +
    'Building confident, kind, and lifelong learners, one Little Legend at a time.';

  GmailApp.sendEmail(friendEmail, subject, plainBody, {htmlBody: htmlBody, name: 'Little Legends Learning Loft', replyTo: myEmail});
  return HtmlService.createHtmlOutput('<script>window.top.location.href="https://legendschildcare.com/pages/thank-you.html";</script>');
}

function testAuth() {
  GmailApp.sendEmail(Session.getEffectiveUser().getEmail(), 'Auth Test', 'If you get this, authorization works.');
}

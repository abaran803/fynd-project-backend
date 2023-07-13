const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abaran803@gmail.com",
    pass: "mcekrxssgvosvrel",
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server validation done and ready for messages.");
  }
});

const email = (
  employeeId,
  manager,
  duration,
  type,
  ticketId,
  ticketStatus,
  subject,
  description
) => {
  const generatedMailBody = `<table>
    <tr>
        <th>Employee Id</th>
        <td>${employeeId}</td>
    </tr>
    <tr>
        <th>Manager</th>
        <td>${manager}</td>
    </tr>
    <tr>
        <th>Duration</th>
        <td>${duration}</td>
    </tr>
    <tr>
        <th>Type</th>
        <td>${type}</td>
    </tr>
    <tr>
        <th>Ticket Id</th>
        <td>${ticketId}</td>
    </tr>
    <tr>
        <th>Ticket Status</th>
        <td>${ticketStatus}</td>
    </tr>
    <tr>
        <th>Subject</th>
        <td>${subject}</td>
    </tr>
    <tr>
        <th>Description</th>
        <td>${description}</td>
    </tr>
    </table>`;

  return {
    from: "abaran803@gmail.com",
    to: "jigar@fynd.com",
    subject: "Request for Ticket",
    html: generatedMailBody,
  };
};

async function main(data) {
  return await transporter.sendMail(
    email(
      data.employeeId,
      data.manager,
      data.duration,
      data.type,
      data.ticketId,
      data.ticketStatus,
      data.subject,
      data.description
    )
  );
}

module.exports = main;

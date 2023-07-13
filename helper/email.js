const SMTPClient = require('emailjs');

  async function main() {
    const client = new SMTPClient({
        user: 'Ayush',
        password: 'my fan was',
        host: 'abaran803@gmail.com',
        ssl: true,
    });

    // send the message and get a callback with an error or details of the message that was sent
    client.send(
        {
            text: 'i hope this works',
            from: 'abaran803@gmail.com',
            to: 'jigar@fynd.com',
            subject: 'testing emailjs',
        },
        (err, message) => {
            console.log(err || message);
        }
    );
  }
  
  module.exports = main;
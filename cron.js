import moment from 'moment-timezone';

const cron = require('node-cron');

const { sentmail } = require('./src/utils/mail');
const { LockerPasscode, User } = require('./src/db/models');
const { setupConnection } = require('./src/db/db.connect');

const getRandomId = async () => {
  let min = 0;
  let max = 500000;
  min = Math.ceil(min);
  max = Math.floor(max);
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  const result = `${num.toString().padStart(6, '0')}`;
  return result;
};

async function cron_passcode() {
  await setupConnection(
    'Mongoose connection sentosa db cron initial... 📦',
  );
  cron.schedule(
    '00 00 00 * * *', //  will run every day at 12:00AM
    async () => {
      console.log('running a task every minute');
      const passcode = await getRandomId();
      const passcodecheck = await LockerPasscode.find();
      console.log(passcode);
      if (passcodecheck.length === 0) {
        await LockerPasscode.create({
          passcode,
          type: 'passcode',
        });
        const html = `<p>passcode: ${passcode}</p>`;
        await sentmail(
          'Sentosa.info@skyparkglobal.com',
          'Locker Unlock PassCode',
          html,
        );
      } else {
        await LockerPasscode.findOneAndUpdate({ type: 'passcode' }, {
          $set: {
            passcode,
          },
        }, { new: true });
        const html = `<p>passcode: ${passcode}</p>`;
        await sentmail(
          'Sentosa.info@skyparkglobal.com',
          'Locker Unlock PassCode',
          html,
        );
      }
    },
    {
      scheduled: true,
      timezone: process.env.Time_Zone, // Time Zone
    },
  );
}
cron_passcode();

async function testcreate() {
  const userlist = await User.find();
  for (const i in userlist) {
    const updateresonse = await User.findOneAndUpdate({ _id: userlist[i]._id }, {
      $set: {
        createdDate: moment(userlist[i].createdAt).format('YYYY-MM-DD'),
      },
    }, { new: true });
    console.log(updateresonse);
  }
}

testcreate();

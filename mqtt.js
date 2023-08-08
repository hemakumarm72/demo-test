const moment = require('moment-timezone');
const mqtt = require('mqtt');
const { Locker } = require('./src/db/models');
const { setupConnection } = require('./src/db/db.connect');

require('dotenv').config();

(async () => {
  await setupConnection(
    'Mongoose connection sentosa db mqtt locker initial... 📦',
  );
  Locker.watch().on('change', async (change) => {
    if (change.operationType === 'insert') {
      locker_reset();
    }
    if (change.operationType === 'delete') {
      locker_reset();
    }
  });
})();

async function locker_reset() {
  const client = mqtt.connect('mqtt://broker.emqx.io:1883');
  const lockercheck = await Locker.find();
  // console.log(lockercheck);
  for (const i in lockercheck) {
    const { subscribe_topic } = lockercheck[i];
    await client.unsubscribe(subscribe_topic);
    await client.subscribe(subscribe_topic);
  }

  await client.on('message', async (topic, message) => {
    const status = await message.toString();
    console.log(topic, status);
    if (status === 'lock') {
      await Locker.findOneAndUpdate(
        { subscribe_topic: topic },
        {
          $set: {
            status,
            last_lock: moment()
              .tz(process.env.Time_Zone)
              .format('YYYY-MM-DD HH:mm:ss'),
          },
        },
        { new: true },
      );
    } else if (status === 'open') {
      await Locker.findOneAndUpdate(
        { subscribe_topic: topic },
        {
          $set: {
            status,
            last_lock: moment()
              .tz(process.env.Time_Zone)
              .format('YYYY-MM-DD HH:mm:ss'),
          },
        },
        { new: true },
      );
    }
  });
}

locker_reset();

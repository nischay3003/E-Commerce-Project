const Redis=require('ioredis');
const client = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  // password: process.env.REDIS_PASSWORD, // Uncomment if needed
});
client.on('connect',()=>{
    console.log("✅ Redis Connected");
})
client.on('error', (err) => {
  console.error('❌ Redis error:', err);
});



module.exports = client;

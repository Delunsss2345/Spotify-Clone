require('module-alias/register');
require('dotenv').config();
const httpServer = require('@root/app')
const connectDB = require('@config/db')
connectDB(); 

const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});

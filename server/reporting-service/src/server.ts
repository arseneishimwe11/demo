import app from './app';

const PORT = process.env.PORT || 3005;

/**
 * Starts the Reporting Service server and listens on the specified port.
 * Logs a console message when the server successfully starts.
 */
app.listen(PORT, () => {
  console.log(`Reporting Service running on port ${PORT}`);
});
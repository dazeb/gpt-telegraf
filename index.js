const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Set the webhook URL for Telegram to send updates to
bot.telegram.setWebhook(`${process.env.APP_URL}/bot${process.env.BOT_TOKEN}`);

// Route for handling incoming updates from Telegram
bot.on('callback_query', (ctx) => {
  // Handle button clicks
  const buttonPressed = ctx.update.callback_query.data;
  switch (buttonPressed) {
    case 'button1':
      ctx.reply('You pressed button 1');
      break;
    case 'button2':
      ctx.reply('You pressed button 2');
      break;
    default:
      break;
  }
});

// Create an inline menu with two buttons
const inlineMenu = {
  inline_keyboard: [
    [
      { text: 'Button 1', callback_data: 'button1' },
      { text: 'Button 2', callback_data: 'button2' },
    ]
  ]
};

// Define a function that will be called when the bot receives a new message
bot.on('message', (ctx) => {
  // Send the inline menu to the user
  ctx.reply('Choose an option:', { reply_markup: inlineMenu });
});

// Start the Express server to listen for incoming requests
const express = require('express');
const app = express();

app.use(bot.webhookCallback(`/bot${process.env.BOT_TOKEN}`));

const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

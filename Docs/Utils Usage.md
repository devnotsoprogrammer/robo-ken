### **Utils Class Function Usage Guide**

---

#### **1. `sendEmbed(channelId, embed)`**
Sends an embed message to a specified channel.

**Usage:**
```javascript
const embed = utils.createEmbed({
  title: "Hello!",
  description: "This is a test embed.",
  color: "#5865F2"
});
utils.sendEmbed("CHANNEL_ID", embed);
```

---

#### **2. `createEmbed(options)`**
Creates a new embed with customizable options.

**Options:**
- `title`: The title of the embed.
- `description`: The description of the embed.
- `color`: The color of the embed border (hex code).
- `fields`: An array of field objects (`{ name, value, inline? }`).
- `footer`: Footer text.
- `footerIcon`: URL for the footer image.
- `image`: URL for the main embed image.
- `thumbnail`: URL for the thumbnail image.
- `timestamp`: Boolean to include a timestamp.

**Usage:**
```javascript
const embed = utils.createEmbed({
  title: "Embed Title",
  description: "Embed Description",
  color: "#7289DA",
  fields: [
    { name: "Field 1", value: "Value 1", inline: true },
    { name: "Field 2", value: "Value 2", inline: false }
  ],
  footer: "Footer Text",
  footerIcon: "https://example.com/footer-icon.png",
  image: "https://example.com/main-image.png",
  thumbnail: "https://example.com/thumbnail.png",
  timestamp: true
});
```

---

#### **3. `createButton(options)`**
Creates a button with customizable options.

**Options:**
- `customId`: Unique identifier for the button.
- `label`: Text displayed on the button.
- `style`: Button style (`PRIMARY`, `SUCCESS`, `DANGER`, etc.).
- `emoji`: Optional emoji for the button.

**Usage:**
```javascript
const button = utils.createButton({
  customId: "button_id",
  label: "Click Me",
  style: "PRIMARY",
  emoji: "🔥"
});
```

---

#### **4. `createActionRow(components)`**
Creates an action row containing components (e.g., buttons).

**Usage:**
```javascript
const button = utils.createButton({
  customId: "button_id",
  label: "Click Me",
  style: "PRIMARY"
});
const actionRow = utils.createActionRow([button]);
```

---

#### **5. `delay(ms)`**
Pauses execution for a specified duration.

**Usage:**
```javascript
await utils.delay(2000); // Waits for 2 seconds
```

---

#### **6. `logError(error)`**
Logs an error by sending an embed to the designated error logs channel.

**Usage:**
```javascript
try {
  // Code that might throw an error
} catch (error) {
  await utils.logError(error);
}
```

---

#### **7. `getUserFromMention(mention)`**
Parses a user mention string and returns the corresponding user.

**Usage:**
```javascript
const user = utils.getUserFromMention("<@123456789012345678>");
console.log(user);
```

---

#### **8. `parseTime(totalSeconds)`**
Converts seconds into a human-readable format (days, hours, minutes, seconds).

**Usage:**
```javascript
const time = utils.parseTime(3600); // "1h 0m 0s"
console.log(time);
```

---

#### **9. `getDefaultColor()`**
Returns the default embed color.

**Usage:**
```javascript
const defaultColor = utils.getDefaultColor();
console.log(defaultColor); // "#ED4245"
```

---

#### **10. `capitalize(text)`**
Capitalizes the first letter of a string.

**Usage:**
```javascript
const capitalized = utils.capitalize("hello world");
console.log(capitalized); // "Hello world"
```

---

#### **11. `randomItem(array)`**
Returns a random element from an array.

**Usage:**
```javascript
const items = ["apple", "banana", "cherry"];
const randomItem = utils.randomItem(items);
console.log(randomItem);
```

---

#### **12. `validateURL(url)`**
Checks whether a string is a valid URL.

**Usage:**
```javascript
const isValid = utils.validateURL("https://example.com");
console.log(isValid); // true
```

---

#### **13. `getMemberFromGuild(guildId, userId)`**
Fetches a guild member by their user ID.

**Usage:**
```javascript
const member = await utils.getMemberFromGuild("GUILD_ID", "USER_ID");
console.log(member);
```

---

#### **14. `formatDate(dateInput, options)`**
Formats a date or timestamp into a human-readable string.

**Usage:**
```javascript
const formattedDate = utils.formatDate(Date.now());
console.log(formattedDate); // e.g., "4/6/2023, 11:54:03 AM"
```

---

#### **15. `formatNumber(number)`**
Formats a number with commas as thousand separators.

**Usage:**
```javascript
const formattedNumber = utils.formatNumber(1234567);
console.log(formattedNumber); // "1,234,567"
```

---

#### **16. `createProgressBar(current, total, length)`**
Creates a visual progress bar string.

**Usage:**
```javascript
const progressBar = utils.createProgressBar(50, 100, 20);
console.log(progressBar); // "██████████░░░░░░░░░░"
```

---

#### **17. `splitMessage(message, maxLength)`**
Splits a long message into chunks.

**Usage:**
```javascript
const longMessage = "A".repeat(5000);
const chunks = utils.splitMessage(longMessage);
console.log(chunks); // Array of message chunks
```

---

#### **18. `retry(fn, retries, delayMs)`**
Retries a promise-based function a specified number of times.

**Usage:**
```javascript
await utils.retry(async () => {
  // Code that might fail
}, 3, 1000); // Retries 3 times with a 1-second delay
```

---

#### **19. `checkRoleHierarchy(executor, target, botMember)`**
Checks role hierarchy for executor, target, and bot.

**Usage:**
```javascript
const roleCheck = utils.checkRoleHierarchy(executor, target, botMember);
if (!roleCheck.success) {
  return message.reply({ embeds: [roleCheck.embed] });
}
// Proceed with action
```

---
var spinButton = document.getElementById("spin-button");
var slotEmojis = document.querySelectorAll(".slot-emoji");
var emojis = ["🍒", "🍋", "🍊", "🍇", "🍉", "🍈", "💎", "💠", "💰", "💲"];

spinButton.addEventListener("click", spin);

function spin() {
  var cost = parseFloat(document.getElementById("spin-cost").value);
  var balance =
    parseFloat(document.getElementById("balance").textContent) || 1000;
  if (balance < cost) {
    alert("YOU'RE BROKE!");
    return;
  }
  spinButton.disabled = true;
  var stopCounts = [];
  for (var i = 0; i < slotEmojis.length; i++) {
    stopCounts.push(
      Math.floor(Math.random() * emojis.length * 10) + emojis.length
    );
  }
  var stoppedCount = 0;
  var intervalId = setInterval(function () {
    for (var i = 0; i < slotEmojis.length; i++) {
      if (stopCounts[i] > 0) {
        stopCounts[i]--;
        slotEmojis[i].textContent =
          emojis[Math.floor(Math.random() * emojis.length)];
        if (stopCounts[i] === 0) {
          stoppedCount++;
        }
      }
    }
    if (stoppedCount === slotEmojis.length) {
      clearInterval(intervalId);
      var emojiCounts = {};
      for (var i = 0; i < emojis.length; i++) {
        if (!emojiCounts[emojis[i]]) {
          emojiCounts[emojis[i]] = 1;
        } else {
          emojiCounts[emojis[i]]++;
        }
      }
      let slotEmojiText = [...slotEmojis].map(
        (slotEmoji) => slotEmoji.textContent
      );
      let allMatch =
        slotEmojiText[0] === slotEmojiText[1] &&
        slotEmojiText[1] === slotEmojiText[2];
      let twoMatch =
        (slotEmojiText[0] === slotEmojiText[1] &&
          slotEmojiText[1] !== slotEmojiText[2]) ||
        (slotEmojiText[0] !== slotEmojiText[1] &&
          slotEmojiText[1] === slotEmojiText[2]) ||
        (slotEmojiText[0] === slotEmojiText[2] &&
          slotEmojiText[1] !== slotEmojiText[2]);

      if (allMatch) {
        balance += cost * 3;
      } else if (!allMatch && twoMatch) {
        balance += cost;
      } else {
        balance -= cost;
      }
      document.getElementById("balance").textContent = balance.toFixed(2);
      setTimeout(function () {
        if (allMatch) {
          alert("All Match! your balance is now: " + balance);
        } else if (!allMatch && twoMatch) {
          alert("Two Match! your balance is now: " + balance);
        } else {
        }
        spinButton.disabled = false;
      }, 500);
    }
  }, 100);
}

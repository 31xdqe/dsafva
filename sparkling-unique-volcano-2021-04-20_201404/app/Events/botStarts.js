module.exports = () => {
    console.log("Bot başarıyla çalıştırıldı.");
    client.user.setPresence({ activity: { name: "Fex was here 🖤" }, status: "idle" });
  }
  module.exports.configuration = {
    name: "ready"
  }
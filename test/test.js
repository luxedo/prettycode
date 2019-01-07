const pc = require("prettycode");

const opts = {
  addHeader: "<b>Preetycode Source</b>"
};
pc("prettycode", opts)
.then(err => {
  if (err) throw err;
  console.log("Done!");
});

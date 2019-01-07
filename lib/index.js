const child_process = require("child_process");
const detect = require("language-detect");
const fs = require("fs");
const hljs = require("highlight.js");
const markdown = require("markdown-it");
const path = require("path");
const puppeteer = require("puppeteer");

const VERSION = JSON.parse(fs.readFileSync("package.json")).version;

const prettycode = (fileName, options = {}) => {
  return new Promise((resolve, reject) => {
    const style = options.style || "github";
    const encoding = options.encoding || "utf-8";
    const language = options.language || "";
    const header = options.addHeader || "";
    const footer = options.addFooter|| "";
    const output = options.output || ".";

    if (!fs.existsSync(output)) {
      child_process.execSync(`mkdir -p ${output}`);
    }

    var md = markdown({
      html: false,
      xhtmlOut: false,
      breaks: false,
      langPrefix: "language-",
      linkify: false,
      typographer: false,
      quotes: "“”‘’",
      highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
          } catch (__) {}
        }
        return `<pre class="hljs"><code>${hljs.highlightAuto(str).value}</code></pre>`;
      }
    });

    fs.readFile(fileName, encoding, (err, data) => {
      if (language == "") {
        try {
          const language = detect.sync(`${__dirname}/${file}`);
        } catch (error) {
          // console.log(error);
        }
      }
      const code = md.render(`\`\`\`${language}\n${data}\n\`\`\`\n\n`);
      let html = `
      <html>
        <body>
          ${code.trim()}
        </body>
      </html>`;

      /* jshint ignore:start */
      (async () => {
        const browser = await puppeteer.launch({
          args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        const page = await browser.newPage();
        await page.setContent(html);
        let tag = (string) => `<span style="font-size: 10px; width: 800px; height: 200px; color: #333; margin: 20px; margin-left: 50px">${string}</span>`
        let options = {
          path: `${output}/${fileName}.pdf`,
          format: "A4",
          margin: {
            top: "20mm",
            right: "15mm",
            bottom: "25mm",
            left: "15mm",
          },
          displayHeaderFooter: header!==""||footer!=="",
          headerTemplate: tag(header),
          footerTemplate: tag(footer),
        };
        await page.addStyleTag({path: `${__dirname}/../node_modules/highlight.js/styles/${style}.css`});
        await page.addStyleTag({content: `
          @media print {
              pre {
                  white-space: pre-wrap;
              }
          }
          html {
            -webkit-print-color-adjust: exact;
            font-size: 10px;
          }`
        });
        await page.pdf(options);
        await browser.close();
        resolve();
      })();
      /* jshint ignore:end */
    });

  });
};

prettycode.VERSION = VERSION;

module.exports = prettycode;

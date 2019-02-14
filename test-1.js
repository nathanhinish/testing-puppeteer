const puppeteer = require("puppeteer");
const fetch = require("node-fetch");

const BODY_URL = "http://localhost:3000/body.html";
// const BODY_URL = "http://next.pinkman.tri.ad/pdf/co18_t3_01/src/body";
const FOOTER_URL = "http://localhost:3000/footer.html";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(FOOTER_URL, {
      waitUntil: "networkidle0"
    });

    const footerTemplate = await page
      .$eval("body", el => el.innerHTML)
      .then(c => (c || "").trim());

    await page.goto(BODY_URL, {
      waitUntil: "networkidle0"
    });
    await page.pdf({
      path: "example.pdf",
      format: "Letter",
      // scale: 1.1,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      printBackground: true,
      margin: {
        top: "0in",
        left: "0in",
        right: "0in",
        bottom: "0.25in"
      },
      headerTemplate: " ",
      footerTemplate
    });
  } catch (err) {
    console.info(err);
  }

  await browser.close();
})();

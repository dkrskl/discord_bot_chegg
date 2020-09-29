const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const UserAgent = require("user-agents");

const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const login = async (client) => {
  try {
    if (client.browser) client.browser.close();
    // Try to look as real as possible
    client.browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      args: [
        "--window-size=1400,900",
        "--disable-gpu",
        "--disable-features=IsolateOrigins,site-per-process",
        "--blink-settings=imagesEnabled=true",
      ],
    });

    client.page = await client.browser.pages();
    client.page[0].setDefaultNavigationTimeout(10000);

    const userAgent = new UserAgent();
    await client.page[0].setUserAgent(userAgent.toString());

    console.log("Heading towards Chegg.com");
    await client.page[0].goto(
      "https://www.chegg.com/auth?action=login&redirect=https%3A%2F%2Fwww.chegg.com%2F",
      {
        waitUntil: "networkidle2",
      }
    );

    // Try to login
    console.log("Trying to login to Chegg.com");
    await client.page[0].type("#emailForSignIn", client.config.cheggUser, {
      delay: 50,
    });
    await client.page[0].type("#passwordForSignIn", client.config.cheggPass, {
      delay: 50,
    });
    await client.page[0].click(
      "#eggshell-8 > form > div > div > div > footer > button"
    );

    const finalResponse = await client.page[0].waitForResponse(
      (response) =>
        response.url() === "https://www.chegg.com/" && response.status() === 200
    );

    if (finalResponse.ok()) {
      console.log("Login successful");
      return true;
    } else {
      console.error("Couldn't login. Trying again.");
      setTimeout(login, 0);
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = login;

import { memo, useEffect } from "react";
import isEqual from "react-fast-compare";

const CookiePolicy = () => {
  useEffect(() => {
    document.title = "Cookie Policy - Yanji Social";
  }, []);

  return (
    <div className="fs-4" style={{ padding: "8rem" }}>
      <h2>Cookie Policy of Yanji Social</h2>

      <p>Welcome to Yanji Social.</p>

      <p>
        This Cookie Policy is designed to inform you about our practices
        regarding the collection of information through cookies and other
        tracking technologies (like gifs, web beacons, etc.).
      </p>

      <p>
        The functionalities for which we use these technologies may include, but
        are not limited to, the following:
      </p>

      <ul>
        <li>Understanding how you navigate through our website</li>
        <li>Personalizing your experience on our site</li>
        <li>
          Providing you with customized content or offers on our site or within
          our advertising
        </li>
        <li>Optimizing your user experience on our site</li>
      </ul>

      <p>
        In the context of this policy, 'we', 'our', and 'us' refers to Yanji
        Social and 'you' refers to you, as the user of this website.
      </p>

      <p>
        By using Yanji Social, you accept our use of cookies in accordance with
        this Cookie Policy. If you do not accept the use of cookies, please
        disable them as instructed in this Cookie Policy, so they are not
        downloaded to your device when you use our website.
      </p>

      <p>
        We reserve the right to modify this Cookie Policy at any time. Any
        changes will be effective immediately upon posting to the website, so
        please review it frequently.
      </p>

      <h3>How We Use Cookies</h3>

      <p>
        At our website, "Social Media," we use cookies for various purposes.
        Cookies are small text files that are stored on your device when you
        visit our site. These cookies allow us to enhance your browsing
        experience, personalize content, and provide you with certain
        functionalities. By using our website, you consent to the use of cookies
        in accordance with this policy.
      </p>

      <h4>Types of Cookies We Use</h4>

      <h5>Essential Cookies</h5>

      <p>
        These cookies are necessary for the proper functioning of our website.
        They enable you to navigate our site, log in to secure areas, and access
        certain features and services. Without these cookies, some parts of our
        website may not be accessible or function correctly.
      </p>

      <h5>Preferences Cookies</h5>

      <p>
        Preferences cookies are used to remember your browsing preferences and
        settings. These cookies help enhance your user experience by remembering
        your language preferences, font size preferences, and other customizable
        elements of our website.
      </p>

      <h5>Analytics and Performance Cookies</h5>

      <p>
        We use analytics and performance cookies to collect information about
        how visitors use our website. These cookies allow us to analyze user
        behavior, such as the number of visitors, the pages visited, and the
        average time spent on our website. This data helps us improve the
        performance and usability of our site.
      </p>

      <h5>Third-Party Cookies</h5>

      <p>
        In addition to our own cookies, we also use third-party cookies on our
        website. These cookies are placed and controlled by external companies
        or service providers. The use of third-party cookies enables us to
        provide you with additional functionalities and personalized
        experiences. Please note that we do not have control over these cookies,
        and their usage is subject to the respective third-party's cookie
        policies.
      </p>

      <p>The following third-party cookies are utilized on our site:</p>

      <ul>
        <li>
          Google Analytics (analytics): Google Analytics is a web analytics
          service that helps us understand how visitors engage with our website.
          It provides us with valuable insights into user behavior and helps us
          improve our site's performance and content.
        </li>
        <li>
          Facebook Pixel (preferences): The Facebook Pixel allows us to measure,
          optimize, and build audiences for our advertising campaigns on
          Facebook. It helps us understand the effectiveness of our marketing
          efforts and deliver relevant content to our users.
        </li>
      </ul>

      <p>
        It's important to note that these third-party cookies may track your
        browsing activity on other websites beyond our site. We recommend
        reviewing the respective privacy policies of these third parties for
        further information on their cookie usage and how to opt-out if desired.
      </p>

      <p>
        For more information on how we handle your personal data and your
        rights, please refer to our Privacy Policy.
      </p>

      <h3>How to Manage and Delete Cookies</h3>

      <p>
        Most web browsers allow you to manage your cookie preferences. You can
        set your browser to refuse cookies or delete certain cookies. Generally,
        you should also be able to manage similar technologies in the same way
        that you manage cookies – using your browsers' preferences.
      </p>

      <p>Here is how you can do it in different browsers:</p>

      <ul>
        <li>
          <strong>Google Chrome:</strong> Go to Settings {">"} Privacy and
          security {">"} Site Settings {">"} Cookies and site data. Here, you
          can Clear cookies and site data as well as setting the browser to
          Block third-party cookies.
        </li>
        <li>
          <strong>Mozilla Firefox:</strong> Go to Options {">"} Privacy &
          Security {">"} Cookies and Site Data. You can Clear Data here, or you
          can set the browser to delete cookies every time you quit the browser.
        </li>
        <li>
          <strong>Safari:</strong> Go to Preferences {">"} Privacy {">"} Cookies
          and website data. You can then Block all cookies or remove specific
          cookies.
        </li>
        <li>
          <strong>Internet Explorer:</strong> Go to Settings {">"} Internet
          options {">"} General {">"} Browsing history {">"} Settings {">"}{" "}
          Temporary Internet Files and Website Files. Here, you can Delete files
          or set the browser to delete browser history on exit.
        </li>
      </ul>

      <p>
        Please be aware that if you choose to block cookies, you may not be able
        to sign in or use those features, and preferences that are dependent on
        cookies may be lost. If you choose to delete cookies, settings and
        preferences controlled by those cookies will be deleted and may need to
        be recreated.
      </p>
    </div>
  );
};

export default memo(CookiePolicy, isEqual);

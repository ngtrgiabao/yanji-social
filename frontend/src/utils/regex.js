const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PSW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/;
const PSW_STRENGTH_REGEX =
  /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
const EMAIL_ADDRESS_REGEX = /^[\w\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
const PHONE_NUMBER_REGEX =
  /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/;

// Extract hashtags from a text or post
const HASHTAG_REGEX = /^#[a-zA-Z0-9_]+$/;
const MENTION_REGEX = /@[a-zA-Z0-9_]+/;

// YYYY-MM-DD
const DATE_FORMAT_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const DATE_CARD_REGEX = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
const NUMERIC_REGEX = /^\d+$/;
const VISA_REGEX = /^4[0-9]{12}(?:[0-9]{3})?$/;
const MASTER_CARD_REGEX = /^4[0-9]{12}(?:[0-9]{3})?$/;

const IPV4_REGEX =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
const IPV6_REGEX =
  /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;

/* Match both IPv4, IPv6 addresses */
const IPV4_AND_IPV5_REGEX =
  /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

const DESKTOP_REGEX = /desktop/;
const MOBILE_REGEX =
  /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i;
const TABLET_REGEX = /iPad|Android/i;

const CHROME_REGEX = /Chrome\/([\d.]+)/;
const FIREFOX_REGEX = /Firefox\/([\d.]+)/;
const SAFARI_REGEX = /Version\/([\d.]+).*Safari/;

const URL_REGEX =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,}(\/[^\s]*)?$/i;
const URL_SPLIT_REGEX = /(http[s]?:\/\/[^\s]+)/gi;
const FACEBOOK_REGEX =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?facebook\.com(\/[^\s]*)?$/i;
const FACEBOOK_VIDEO_REGEX =
  /^https:\/\/www\.facebook\.com\/([^\/?].+\/)?video(s|\.php)[\/?].*$/gm;
const TWITTER_REGEX =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?twitter\.com(\/[^\s]*)?$/i;
const INSTAGRAM_REGEX =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?instagram\.com(\/[^\s]*)?$/i;
const LINKDIN_REGEX =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?linkedin\.com(\/[^\s]*)?$/i;
const YOUTUBE_REGEX =
  /^http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/i;
const PINTEREST_REGEX =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?pinterest\.com(\/[^\s]*)?$/i;
const SNAPCHAT_REGEX =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?snapchat\.com(\/[^\s]*)?$/i;
const TIKTOK_REGEX =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?tiktok\.com(\/[^\s]*)?$/i;
const TWITCH_REGEX = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?twitch\.tv(\/[^\s]*)?$/i;

export {
  USER_REGEX,
  PSW_REGEX,
  PSW_STRENGTH_REGEX,
  EMAIL_REGEX,
  EMAIL_ADDRESS_REGEX,
  PHONE_NUMBER_REGEX,
  HASHTAG_REGEX,
  MENTION_REGEX,
  DATE_FORMAT_REGEX,
  DATE_CARD_REGEX,
  NUMERIC_REGEX,
  VISA_REGEX,
  MASTER_CARD_REGEX,
  IPV4_REGEX,
  IPV6_REGEX,
  IPV4_AND_IPV5_REGEX,
  DESKTOP_REGEX,
  MOBILE_REGEX,
  TABLET_REGEX,
  CHROME_REGEX,
  FIREFOX_REGEX,
  SAFARI_REGEX,
  URL_REGEX,
  URL_SPLIT_REGEX,
  FACEBOOK_REGEX,
  FACEBOOK_VIDEO_REGEX,
  TWITTER_REGEX,
  INSTAGRAM_REGEX,
  LINKDIN_REGEX,
  YOUTUBE_REGEX,
  PINTEREST_REGEX,
  SNAPCHAT_REGEX,
  TIKTOK_REGEX,
  TWITCH_REGEX,
};

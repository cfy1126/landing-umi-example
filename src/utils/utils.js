import React from "react";
import { getLocale } from "umi";
import { Button } from "antd";

export const isImg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;

export const getChildrenToRender = (item, i) => {
  let tag = item.name.indexOf("title") === 0 ? "h1" : "div";
  tag = item.href ? "a" : tag;
  let children =
    typeof item.children === "string" && item.children.match(isImg)
      ? React.createElement("img", { src: item.children, alt: "img" })
      : item.children;
  if (item.name.indexOf("button") === 0 && typeof item.children === "object") {
    children = React.createElement(Button, {
      ...item.children,
    });
  }
  return React.createElement(tag, { key: i.toString(), ...item }, children);
};

export const getLaguage = (locale) => {
  if (locale.indexOf("zh") !== -1) {
    locale = "zh";
  } else if (locale.indexOf("en") !== -1) {
    locale = "en";
  } else {
    locale = "zh";
  }
  return locale;
};

export const isMobileDevice = () => {
  const userAgent = navigator.userAgent;
  const mobileDeviceRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileDeviceRegex.test(userAgent);
};

export const getMobileOperatingSystem = () => {
  var userAgent = navigator.userAgent || navigator.vendor;

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "iOS";
  }

  return "Unknown";
};

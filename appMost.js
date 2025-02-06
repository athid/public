/// Reusable function to call iOS and Android native bindings in an Appmost app
/// Example: callNativeFunction("showDialog", { title: "Title here", message: "Message here"});
function callNativeFunction(functionName, parameters) {
  let functionObj = { function: functionName };
  let methodCall = { ...functionObj, ...parameters };
  const iOSUserAgents = ["ios", "iphone", "ipad"];
  const userAgentIncludesIOS = iOSUserAgents.some((t) =>
    navigator.userAgent.includes(t)
  );
  if (userAgentIncludesIOS) {
    if (window.webkit?.messageHandlers?.appmostCallback) {
      window.webkit.messageHandlers.appmostCallback.postMessage(methodCall);
    }
  } else if (navigator.userAgent.includes("android")) {
    let json = JSON.stringify(methodCall);
    appmostCallback.postMessage(json);
  }
}

/// Only to be used when Firebase is used for Push Notifications
function getFirebaseToken() {
  callNativeFunction("getFirebasePushToken", {
    callbackFunction: "didRecieveFirebasePushToken",
  });
}

function getPushToken() {
  callNativeFunction("getPushToken", {
    callbackFunction: "didRecievePushToken",
  });
}

function didRecieveFirebasePushToken(token, error) {
  if (token != null) {
    alert("Got token: " + token);
  } else {
    alert("Got token error: " + error);
  }
}

function didRecievePushToken(token, error) {
  if (token != null) {
    alert("Got token: " + token);
  } else {
    alert("Got token error: " + error);
  }
}

const createReactClass = require("create-react-class");
const Crypto = require("crypto-browserify");

const Utility = createReactClass({
  statics: {
    sessionIdTokenGenerator: function () {
      try {
        let sessionIdToken = Crypto.randomBytes(32).toString("hex");
        return sessionIdToken;
      } catch (e) {
        console.log("exception in sessionIdTokenGenerator");
      }
    },
  },
  render() {
    return null;
  },
});

export default Utility;

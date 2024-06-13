// This function get a async middleware funciton as a arguement and
// return an anonymous function which calls the function that passed as an arguemnt
// returning funciton has access to the middlware function parameters, due to closure
// it generally a wrapper function to catch error

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

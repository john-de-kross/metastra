const constraints = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: {
      message: "is not valid. Enter a valid email address",
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 6,
      message: "must be at least 6 characters",
    },
  },
};

export default constraints;

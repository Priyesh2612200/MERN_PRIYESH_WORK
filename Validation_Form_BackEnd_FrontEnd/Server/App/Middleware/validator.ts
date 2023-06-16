// import { body } from 'express-validator';

// const formValidationRules = [
//   body('email')

//   .notEmpty().withMessage('Email must not be empty')
//     .isEmail().withMessage('Invalid email format'),

//   body('text')
//     .notEmpty().withMessage('Text must not be empty'),

//   body('password')
//     .notEmpty().withMessage('Password must not be empty'),

//   body('radio')
//     .notEmpty().withMessage('Please select an option'),

//   body('checkbox')
//     .notEmpty().withMessage('Checkbox must be checked'),

//   body('color')
//     .notEmpty().withMessage('Color must not be empty'),

//   body('date')
//     .notEmpty().withMessage('Date must not be empty'),

//   body('number')
//     .notEmpty().withMessage('Number must not be empty')
//     .isNumeric().withMessage('Number must be a valid number'),

//   body('range')
//     .notEmpty().withMessage('Range must not be empty')
//     .isNumeric().withMessage('Range must be a valid number'),

//   body('time')
//     .notEmpty().withMessage('Time must not be empty'),
// ];

// export default  formValidationRules;

export function validatecheck(req: any, res: any, next: any) {
  const {
    radio,
    email,
    text,
    password,
    checkbox,
    color,
    date,
    number,
    range,
    time,
  } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

  // Email validation
  if (!email || !emailRegex.test(email)) {
    if (!email) {
      return res.status(400).json({
        error: "Email field is required",
      });
    }
    return res.status(400).json({
      error: "Invalid email",
    });
  }

  // Text validation
  if (!text) {
    return res.status(400).json({
      error: "Text field is required",
    });
  }

  // Password validation
  if (!password || !passwordRegex.test(password)) {
    if (!password) {
      return res.status(400).json({
        error: "Password field is required",
      });
    }
    return res.status(400).json({
      error: "Invalid password",
      message:
        "Please enter a password with at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    });
  }

  // Radio validation
  if (!radio) {
    return res.status(400).json({
      error: "Radio field is required",
    });
  }

  // Checkbox validation
  if (!checkbox) {
    return res.status(400).json({
      error: "Checkbox field is required",
    });
  }

  // Color validation
  if (!color) {
    return res.status(400).json({
      error: "Color field is required",
    });
  }

  // Date validation
  if (!date) {
    return res.status(400).json({
      error: "Date field is required",
    });
  }

  // Number validation
  if (!number) {
    return res.status(400).json({
      error: "Number field is required",
    });
  }

  // Range validation
  if (!range) {
    return res.status(400).json({
      error: "Range field is required",
    });
  }

  // Time validation
  if (!time) {
    return res.status(400).json({
      error: "Time field is required",
    });
  }

  next();
}

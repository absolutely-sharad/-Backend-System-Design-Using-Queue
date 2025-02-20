const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel'); // Import the User model for database operations
const { ErrorHandler } = require('../utils/errorHandler'); // Import custom error handler

// AuthService object containing functions related to user authentication
const authService = {
  // Function to register a new user
  async registerUser(userData) {
    try {
      // Check if user with the same email already exists
      const existingUser = await UserModel.findOne({ email: userData.email });
      if (existingUser) {
        throw new ErrorHandler(400, 'User with this email already exists');
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create new user document
      const newUser = new UserModel({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
      });

      // Save the user to the database
      const savedUser = await newUser.save();

      // Generate JWT token for user authentication
      const token = jwt.sign(
        { userId: savedUser._id, email: savedUser.email },
        process.env.JWT_SECRET, // Use environment variable for secret key
        { expiresIn: '1h' } // Token expires in 1 hour
      );

      // Return user object and token
      return { user: savedUser, token };
    } catch (error) {
      // Handle errors and throw custom error using the ErrorHandler utility
      throw new ErrorHandler(error.status || 500, error.message);
    }
  },

  // Function to authenticate and login a user
  async loginUser(email, password) {
    try {
      // Find user by email
      const user = await UserModel.findOne({ email });
      if (!user) {
        // If user does not exist, throw error
        throw new ErrorHandler(401, 'Invalid email or password');
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        // If password is invalid, throw error
        throw new ErrorHandler(401, 'Invalid email or password');
      }

      // Generate JWT token for user authentication
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET, // Use environment variable for secret key
        { expiresIn: '1h' } // Token expires in 1 hour
      );

      // Return user object and token
      return { user, token };
    } catch (error) {
      // Handle errors and throw custom error using the ErrorHandler utility
      throw new ErrorHandler(error.status || 500, error.message);
    }
  },

  // Function to verify JWT token
  async verifyToken(token) {
    try {
      // Verify JWT token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Verify token using secret key
      return decodedToken;
    } catch (error) {
      // If token verification fails, throw error
      throw new ErrorHandler(401, 'Invalid token');
    }
  }
};

// Export the authService object to be used by other modules
module.exports = authService;
const User = require("../models/User");
const tokenGenerator = require("../utils/tokenGenerator");
const bcrypt = require("bcryptjs");

const authuser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the password
    if (isPasswordValid) {
      const token = tokenGenerator(res, user._id);
      res
        .status(200)
        .json({ message: "User logged in", token, userRole: user.userRole });
    } else {
      res.status(401).json({ message: "username or password incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createUser = async (req, res) => {
  const { username, password, userRole } = req.body;

  try {
    const validatePassword = (password) => {
      const minlength = 8;
      const specialRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const numberRegex = /[0-9]/;
      const uppercaseRegex = /[A-Z]/;
      const alphabetRegex = /[a-zA-Z]/;

      if (password.length < minlength) {
        return "Password must be at least 8 characters long.";
      }
      if (!specialRegex.test(password)) {
        return "Password must contain at least one special character.";
      }
      if (!numberRegex.test(password)) {
        return "Password must contain at least one number.";
      }
      if (!uppercaseRegex.test(password)) {
        return "Password must contain at least one uppercase letter.";
      }
      if (!alphabetRegex.test(password)) {
        return "Password must contain at least one alphabet.";
      }

      return ""; // No errors, password is valid
    };

    // Check if the user already exists
    const userName = await User.findOne({ username });
    if (userName) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      username,
      password: hashedPassword,
      userRole,
    });

    if (user) {
      res.status(201).json({ message: "User created" });
    } else {
      res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const GetallUser = async (req, res) => {
  try {
    const user = await User.find({});

    res.status(200).json({ message: "  User found", user });
  } catch (error) {
    res.status(400).json({ message: "User not found" });
  }
};

const DeleteUser = async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: "All User deleted " });
  } catch (error) {
    res.status(400).json({ message: "User not deleted" });
  }
};

const DeleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    await User.deleteOne({ _id: id });

    res.status(200).json({ message: "User deleted " });
  } catch (error) {
    res.status(400).json({ message: "User not deleted" });
  }
};

const UpdateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, userRole } = req.body;

  try {
    const user = await User.findById(id);

    if (user) {
      user.username = username || user.username;
      user.password = password || user.password;
      user.userRole = userRole || user.userRole;

      await user.save();
      res.status(200).json({ message: "User updated" });
    }
  } catch (error) {
    res.status(400).json({ message: "User not found" });
  }
};
module.exports = {
  authuser,
  createUser,
  GetallUser,
  DeleteUserById,
  UpdateUser,
  DeleteUser,
};

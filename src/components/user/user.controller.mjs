import HTTP_STATUS from "http-status";
import jwt from "jsonwebtoken";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import {
  findUserByCredential,
  saveUser,
  deleteUser,
  updateUser
} from "./user.service";

export async function loginUserTreatment(req, res) {
  const { email, password } = req.body;
  try {
    const user = await findUserByCredential(email, password);
    const token = await generateToken(user);
    res.status(HTTP_STATUS.OK).send({
      user,
      token
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: error.message
    });
  }
}

async function saveImage(file, email) {
  const publicFolderName = "/public";
  const dest = "/media/profileImages/" + email + "/";
  const nm = file.originalname.match(/(.+?)(\.[^.]*$|$)/);
  const imageName = nm[1] + Date.now() + ".png";
  if (!fs.existsSync(path.join(process.cwd(), publicFolderName + dest))) {
    fs.mkdirSync(path.join(process.cwd(), publicFolderName + dest));
  }
  const imagePath = path.join(
    process.cwd(),
    publicFolderName + dest + imageName.replace(' ', '_')
  );
  await sharp(file.buffer)
    .resize({ width: 400, height: 400 })
    .png()
    .toFile(imagePath);
  return dest + imageName;
}

const DEFAULT_FEMALE_IMAGE = "/media/profileImages/default/female.jpg";
const DEFAULT_MALE_IMAGE = "/media/profileImages/default/male.jpg";

export async function signupUserTreatment(req, res) {
  const requiredFields = ["name", "gender", "email", "password"];
  const keys = Object.keys(req.body);
  const isValidOperation = requiredFields.every(field => keys.includes(field));
  if (!isValidOperation) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send();
  }
  try {
    const data = req.body;
    let image;
    if (req.file) {
      image = await saveImage(req.file, data.email);
    } else {
      image =
        data.gender === "Male" ? DEFAULT_MALE_IMAGE : DEFAULT_FEMALE_IMAGE;
    }
    data.image = image;
    const user = await saveUser(data);
    const token = await generateToken(user);
    res.status(HTTP_STATUS.CREATED).send({
      user,
      token
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).send(error.message);
  }
}

export async function logoutUserTreatment(req, res) {
  try {
    req.session.user.tokens = req.session.user.tokens.filter(
      token => token.token != req.session.token
    );
    await req.session.user.save();
    delete req.session.user;
    res.send();
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function logoutAllUserTreatment(req, res) {
  try {
    req.session.user.tokens = [];
    await req.session.user.save();
    delete req.session.user;
    res.send();
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
  }
}

function generateToken(user) {
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET || "secret"
  );
  user.tokens = user.tokens.concat({ token });
  user.save();
  return token;
}

export function getProfileTreatment(req, res) {
  try {
    res.status(HTTP_STATUS.OK).send(req.session.user);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
  }
}
export async function deleteUserTreatment(req, res) {
  try {
    await deleteUser(req.session.user._id);
    res.status(HTTP_STATUS.OK).send();
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function updateUserTreatment(req, res) {
  const updatesKeys = Object.keys(req.body);
  console.log(req.body);
  console.log(req.file);
  const allowedUpdates = [
    "name",
    "firstName",
    "lastName",
    "email",
    "phone",
    "password",
    "street",
    "city",
    "image"
  ];
  const isValidOperation = updatesKeys.every(key =>
    allowedUpdates.includes(key)
  );
  if (!isValidOperation) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send({
      error: "Operation isn't valid!"
    });
  }
  try {
    const data = req.body;
    let image;
    if (req.file) {
      image = await saveImage(req.file, req.session.user.email);
      updatesKeys.push("image");
      data.image = image;
    }
    const user = await updateUser(req.session.user._id, updatesKeys, data);
    res.status(HTTP_STATUS.OK).send(user);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
      error: error.message
    });
  }
}

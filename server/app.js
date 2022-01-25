const express = require("express");

const path = require("path");

const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./utils/database");
const multer = require("multer");

const app = express();

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const communityRoutes = require("./routes/community");

const User = require("./models/user");
const Community = require("./models/community");
const RequestToJoin = require("./models/request-to-join");
const CommunityMember = require("./models/community-member");
const Post = require("./models/post");

app.use(
  cors({
    origin: "*",
  })
);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "/image/png" ||
    file.mimetype === "/image/jpeg" ||
    file.mimetype === "/image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );
  next();
});

app.use("/admin", adminRoutes);
app.use("/community", communityRoutes);
app.use("/", userRoutes);
app.use((req, res, next) => {
  res.status(404).send();
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

Community.belongsTo(User, {
  foreignKey: "ownerId",
  constraints: true,
  onDelete: "CASCADE",
});

User.belongsToMany(Community, { through: CommunityMember });
User.belongsToMany(Community, { through: RequestToJoin });
User.belongsToMany(Community, { through: Post });

sequelize
  // .sync({
  //   force: true,
  // })
  .sync()
  // .then((result) => {
  //   return User.findByPk(1);
  // })
  // .then((user) => {
  //   if (!user) {
  //     bcrypt.hash("1", 6).then((hashedPassword) => {
  //       return User.create({
  //         email: "a@a.com",
  //         password: hashedPassword,
  //         city: "delhi",
  //         phoneNumber: "123",
  //         role: "admin",
  //       });
  //     });
  //   }
  //   return user;
  // })
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => console.log(err));

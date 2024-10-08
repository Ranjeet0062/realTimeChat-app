import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  profilename: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
  },
  profilephoto: {
    type: String,
    default:
      "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg",
  },
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
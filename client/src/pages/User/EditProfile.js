// import { useState } from "react";

// import { Button, Card, Form, message, Input, Select, Upload } from "antd";
// import { useHistory } from "react-router";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";

// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

// import { updateUserData } from "../../store/user/actions";

// const { Option } = Select;

// const EditProfile = ({ userData, updateUserData, error }) => {
//   let history = useHistory();
//   const [upload, setUpload] = useState({
//     loading: false,
//     image: "",
//   });
//   const onFormSubmitHandle = (data) => {
//     const formData = new FormData();
//     formData.append("email", data.email);
//     formData.append("name", data.name);
//     formData.append("phoneNumber", data.phoneNumber);
//     formData.append("city", data.city);
//     formData.append("gender", data.gender);
//     formData.append("image", data.image.file.originFileObj);
//     formData.append("dob", data.dob);
//     updateUserData(formData);
//     if (error === "") {
//       message.success("Profile edited successfully");
//       history.push("/profile");
//     } else {
//       message.error(error.message);
//     }
//   };

//   function getBase64(img, callback) {
//     const reader = new FileReader();
//     reader.addEventListener("load", () => callback(reader.result));
//     reader.readAsDataURL(img);
//   }

//   function beforeUpload(file) {
//     const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//     if (!isJpgOrPng) {
//       message.error("You can only upload JPG/JPEG/PNG file!");
//     }
//     return isJpgOrPng;
//   }

//   const handleChange = (info) => {
//     if (info.file.status === "uploading") {
//       setLoading(true);
//       return;
//     }
//     if (info.file.status === "done") {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj, (imageUrl) =>
//         this.setState({
//           imageUrl,
//           loading: false,
//         })
//       );
//     }
//   };

//   const uploadButton = (
//     <div>
//       {loading ? <LoadingOutlined /> : <PlusOutlined />}
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   );
//   return (
//     <div className="edit-form">
//       <Form
//         layout="vertical"
//         onFinish={onFormSubmitHandle}
//         initialValues={userData}
//       >
//         <Form.Item name="image">
//           <Upload
//             name="image"
//             listType="picture-card"
//             className="avatar-uploader"
//             beforeUpload={beforeUpload}
//             showUploadList={false}
//             handleChange={handleChange}
//           >
//             {userData.image ? (
//               <img
//                 src={"http://localhost:8000/" + userData.image}
//                 alt="avatar"
//                 style={{ width: "100%" }}
//               />
//             ) : (
//               uploadButton
//             )}
//           </Upload>
//         </Form.Item>
//         <Card title="Basic Info" className="card">
//           <Form.Item
//             name="email"
//             label="E-mail"
//             rules={[
//               {
//                 type: "email",
//                 message: "The input is not valid E-mail!",
//               },
//               { required: true, message: "Please input the email!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="name"
//             label="Name"
//             rules={[{ required: true, message: "Please input your name!" }]}
//           >
//             <Input style={{ width: "100%" }} />
//           </Form.Item>
//           <Form.Item
//             name="dob"
//             label="D.O.B."
//             placeholder="YYYY-MM-DD"
//             rules={[
//               { required: true, message: "Please input the date of birth!" },
//             ]}
//           >
//             <Input style={{ width: "100%" }} />
//           </Form.Item>
//           <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
//             <Select style={{ width: "50%" }} allowClear>
//               <Option value="male">Male</Option>
//               <Option value="female">Female</Option>
//               <Option value="other">Other</Option>
//             </Select>
//           </Form.Item>
//         </Card>
//         <Card title="Contact Info" className="card">
//           <Form.Item
//             name="phoneNumber"
//             label="Phone Number"
//             rules={[
//               { required: true, message: "Please input the phone number!" },
//               { type: "string", min: 10, max: 10 },
//             ]}
//           >
//             <Input style={{ width: "100%" }} />
//           </Form.Item>
//           <Form.Item
//             name="city"
//             label="City"
//             rules={[{ required: true, message: "Please input the city!" }]}
//           >
//             <Input style={{ width: "100%" }} />
//           </Form.Item>
//         </Card>
//         <div className="btns-footer">
//           <Link to="/changePassword">
//             <Button type="primary" danger>
//               Change Password
//             </Button>
//           </Link>
//           <Button type="primary" htmlType="submit">
//             Update
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return { userData: state.user.userData, error: state.user.error };
// };

// export default connect(mapStateToProps, { updateUserData })(EditProfile);

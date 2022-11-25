import {
  Badge,
  Button,
  Col,
  Input,
  Modal,
  notification,
  Row,
  Select,
} from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showImage, showVideo } from "../../../utils/media";
import { DeleteOutlined, FileImageOutlined } from "@ant-design/icons";
import "./style-form.css";
import { createPost } from "../../../redux/actions/postAction";

const Form = ({ status, setStatus }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [valueContent, setValueContent] = useState("");
  const [valueTitle, setValueTitle] = useState("");
  const [valueCategory, setValueCategory] = useState("game_fps");

  const [images, setImages] = useState([]);

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "Please choose file is existing.");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "please input image/video largest is 5mb.");
      }

      return newImages.push(file);
    });

    if (err) return notification.error({ message: `${err}` });
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    let post = {
      title: valueTitle,
      message: valueContent,
      tags: valueCategory,
    };
    if (valueTitle.length === 0) {
      return notification.error({ message: "Please input title post!" });
    }

    if (images.length === 0) {
      return notification.error({ message: "Please add your Media!" });
    }

    dispatch(createPost({ post, images, auth }));
  };
  return (
    <Modal
      closable={false}
      visible={status}
      footer={[
        <Row justify="">
          <Col offset={15}>
            <Button
              style={{
                marginRight: 15,
                color: "yellow",
                background: "black",
                borderRadius: 10,
              }}
              onClick={handleSubmitForm}
            >
              Upload
            </Button>
          </Col>
          <Col>
            <Button
              style={{ borderRadius: 10 }}
              onClick={() => setStatus(false)}
            >
              Cancel
            </Button>
          </Col>
        </Row>,
      ]}
      bodyStyle={{ padding: 0 }}
    >
      <h1
        style={{
          fontWeight: "bold",
          fontSize: 24,
          color: "yellow",
          background: "black",
          padding: 20,
        }}
      >
        CREATE NEW POST
      </h1>
      <div style={{ padding: 20 }}>
        <div style={{ fontWeight: "bold" }}>
          Hallo! How are you today? What news you wanna share?
        </div>
        <Input
          onChange={(e) => setValueTitle(e.target.value)}
          placeholder="Please input Title"
          style={{ marginTop: "20px", borderRadius: 10 }}
        />
        <Input
          onChange={(e) => setValueContent(e.target.value)}
          placeholder="Please input your content"
          style={{ marginTop: "20px", borderRadius: 10, height: 100 }}
        />

        <Row style={{ marginTop: 10 }}>
          <Col span={12}>
            <Select
              style={{ width: "100%" }}
              value={valueCategory}
              onChange={(e) => setValueCategory(e)}
            >
              <Select.Option value="game_fps">GAME FPS</Select.Option>
              <Select.Option value="game_nft">GAME NFT</Select.Option>
            </Select>
          </Col>
          <Col>
            <div className="input_images">
              <div className="file_upload">
                <span>Upload media here ---</span>
                <FileImageOutlined style={{ fontSize: 30 }} />
                <input
                  type="file"
                  name="file"
                  id="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleChangeImages}
                />
              </div>
            </div>
          </Col>
        </Row>

        <div className="show_images">
          {images.map((img, index) => (
            <Badge
              count={
                <DeleteOutlined
                  style={{
                    color: "#f5222d",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteImages(index)}
                />
              }
            >
              <div key={index} id="file_img">
                {img.camera ? (
                  showImage(img.camera)
                ) : img.url ? (
                  <>
                    {img.url.match(/video/i)
                      ? showVideo(img.url)
                      : showImage(img.url)}
                  </>
                ) : (
                  <>
                    {img.type.match(/video/i)
                      ? showVideo(URL.createObjectURL(img))
                      : showImage(URL.createObjectURL(img))}
                  </>
                )}
              </div>
            </Badge>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default Form;

import { Col, Layout, Row } from "antd";
import React, { useState } from "react";
import Footer from "../components/home/footer";
import Header from "../components/home/header";
import Information from "../components/home/Information";
import Welcome from "../components/home/welcome";
import { SideBar } from "../components/sideBar";

const Home = () => {
    const [loadingInfo, setLoadingInfo] = useState(false)
    const [loadingAbout, setLoadingAbout] = useState(false)
  return (
    <Layout>
          <Header loadingInfo={loadingInfo} loadingAbout={loadingAbout} setLoadingInfo={setLoadingInfo} setLoadingAbout={setLoadingAbout} />
          <Welcome />
          <Information loadingInfo={loadingInfo} />
          <Footer loadingAbout={loadingAbout}/>
    </Layout>
  );
};

export default Home;

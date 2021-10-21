import React from "react";
import Table from "../components/Table";
import { tableData } from "../constants/index";

class Home extends React.Component {
  render() {
    return <Table data={tableData} />;
  }
}

export default Home;

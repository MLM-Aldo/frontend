

import { Tree, TreeNode } from "react-organizational-chart";
import styled from 'styled-components'
import { useEffect, useState, React } from "react";

function LevelTree() {
  const StyledNode = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    border: 1px solid red;
  `;
  const base_url = process.env.REACT_APP_API_URL;


  const getAllUsers = async () => {
    try {
      const response = await fetch(base_url + 'users/referrals/dhRn2nNB', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      if (response.ok) {
        let rootData = JSON.parse(JSON.stringify(data.users[0]));
        delete rootData['reportingHierarchy'];
        data.users[0].reportingHierarchy.unshift(rootData)
        let link = 'referredBy';
        let referralCode = rootData.referredBy;
        let items = data.users[0].reportingHierarchy
        items = items
          .filter(item => item[link] === referralCode)
          .map(item => ({ ...item, children: nest(items, item.referralCode) }));

        setUsers(items);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log('An error occurred. Please try again.');
    }
  }

  const [users, setUsers] = useState([]);

  const nest = (items, referralCode, link = 'referredBy') =>
    items
      .filter(item => item[link] === referralCode)
      .map(item => ({ ...item, children: nest(items, item.referralCode) }));


  useEffect(() => {
    getAllUsers();
  }, []);

  const renderTreeNodes = (nodes) => {
    return (
      nodes &&
      nodes.map((node) => (
        <TreeNode label={<StyledNode>{node.username}</StyledNode>}>
          {renderTreeNodes(node.children)}
        </TreeNode>
      ))
    );
  };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Level</h4>
                </div>
                {/* <!-- end card header --> */}

                <div className="card-body">
                <Tree
                  lineWidth={"2px"}
                  lineColor={"green"}
                  lineBorderRadius={"10px"}
                  label={<StyledNode>{users[0].username}</StyledNode>}
                >
                  {renderTreeNodes(users[0].children)}
                </Tree>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LevelTree;

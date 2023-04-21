// import { Tree, TreeNode } from "react-organizational-chart";
import axios from "axios";
import { React, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../footer/footer";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";

function LevelTree() {
  const StyledNode = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    border: 1px solid red;
  `;

  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState("");
  const [refferalBonus, setRefferalBonus] = useState(0);

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const svgStyles = {
    height: 500,
    width: "100%",
  };

  const getAllUsers = async () => {
    try {
      const referralId = user.referralCode;
      axios
        .get(base_url + "users/referrals/" + referralId)
        .then((response) => {
          response.data.users[0].name = response.data.users[0].username;
          response.data.users[0].username = undefined;
          response.data.users[0].reportingHierarchy =
            response.data.users[0].reportingHierarchy.map((user) => {
              return {
                ...user,
                name: user.username,
                username: undefined,
              };
            });
          let rootData = JSON.parse(JSON.stringify(response.data.users[0]));
          delete rootData["reportingHierarchy"];
          response.data.users[0].reportingHierarchy.unshift(rootData);
          let link = "referredBy";
          let referralCode = rootData.referredBy;
          let items = response.data.users[0].reportingHierarchy;
          items = items
            .filter((item) => item[link] === referralCode)
            .map((item) => ({
              ...item,
              children: nest(items, item.referralCode),
            }));

          setUsers(items);
        })
        .catch((error) => {
          console.log(error.message);
        });

      // const response = await fetch(base_url + 'users/referrals/' + referralId, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      // });
      // const data = await response.json();
      // if (response.ok) {
      //   let rootData = JSON.parse(JSON.stringify(data.users[0]));
      //   delete rootData['reportingHierarchy'];
      //   data.users[0].reportingHierarchy.unshift(rootData)
      //   let link = 'referredBy';
      //   let referralCode = rootData.referredBy;
      //   let items = data.users[0].reportingHierarchy
      //   items = items
      //     .filter(item => item[link] === referralCode)
      //     .map(item => ({ ...item, children: nest(items, item.referralCode) }));

      //   setUsers(items);
      // } else {
      //   console.log(data.message);
      // }
    } catch (error) {
      console.log("An error occurred. Please try again.");
    }
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    axios
      .get(base_url + "referrals/referralBonus/" + user.referralCode)
      .then((response) => {
        setRefferalBonus(response.data.referralAmount);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  const nest = (items, referralCode, link = "referredBy") =>
    items
      .filter((item) => item[link] === referralCode)
      .map((item) => ({ ...item, children: nest(items, item.referralCode) }));

  const logout = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(base_url + "users/logout")
        .then((response) => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        })
        .catch((error) => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setError(error.message);
          navigate("/login");
        });

      // const response = await fetch(base_url + 'users/logout', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      // });
      // const data = await response.json();
      // if (response.ok) {
      //     localStorage.removeItem('token');
      //     localStorage.removeItem('user');
      //     navigate('/login');
      // } else {
      //     setError(data.message);
      // }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const MyNodeComponent = ({ nodeData }) => {
    return (
      <g>
        <circle r={10} fill="#fff" stroke="#000" strokeWidth={1} />
        <text x="-25" y="25" style={{ fontSize: "12px" }}>
          {nodeData.username}
        </text>
      </g>
    );
  };

  // const renderTreeNodes = (nodes) => {
  //   return (
  //     nodes &&
  //     nodes.map((node) => (
  //       <TreeNode label={<StyledNode>{node.username}</StyledNode>}>
  //         {renderTreeNodes(node.children)}
  //       </TreeNode>
  //     ))
  //   );
  // };

  const myTreeData = [
    {
      name: "Root Node",
      attributes: {
        age: 35,
        gender: "male",
      },
      children: [
        {
          name: "Child Node 1",
          attributes: {
            age: 10,
            gender: "female",
          },
          children: [
            {
              name: "Grandchild Node 1",
              attributes: {
                age: 5,
                gender: "male",
              },
            },
            {
              name: "Grandchild Node 2",
              attributes: {
                age: 7,
                gender: "female",
              },
            },
          ],
        },
        {
          name: "Child Node 2",
          attributes: {
            age: 12,
            gender: "male",
          },
        },
      ],
    },
  ];

  return (
    <div id="layout-wrapper">
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="h-100">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title mb-0">Level</h4>
                    </div>
                    {/* <!-- end card header --> */}
                    <div
                      className="card-body"
                      style={{
                        height: "78vh",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {users.length > 0 && users[0].children && (
                        // Middle
                        <Tree
                          data={users}
                          translate={{ x: window.innerWidth / 2 - 200, y: 50 }}
                          orientation="vertical"
                          collapsible={true}
                          nodeSize={{ x: 150, y: 150 }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LevelTree;

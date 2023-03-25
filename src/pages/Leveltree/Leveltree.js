// import { Tree, TreeNode } from "react-organizational-chart";
// import styled from 'styled-components'
// import { useEffect, useState, React } from "react";

// function LevelTree() {
//   const StyledNode = styled.div`
//     padding: 5px;
//     border-radius: 8px;
//     display: inline-block;
//     border: 1px solid red;
//   `;
//   const base_url = process.env.REACT_APP_API_URL;


//   const getAllUsers = async () => {
//     try {
//       const response = await fetch(base_url + 'users/referrals/dhRn2nNB', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//       });
//       const data = await response.json();
//       if (response.ok) {
//         let rootData = JSON.parse(JSON.stringify(data.users[0]));
//         delete rootData['reportingHierarchy'];
//         data.users[0].reportingHierarchy.unshift(rootData)
//         let link = 'referredBy';
//         // let heirarchialData = convertToHierarchy(data.users[0].reportingHierarchy);
//         // let result = data.users[0].reportingHierarchy
//         // nest(result,rootData.referredBy);
//         let referralCode = rootData.referredBy;
//         let items = data.users[0].reportingHierarchy
//         items = items
//           .filter(item => item[link] === referralCode)
//           .map(item => ({ ...item, children: nest(items, item.referralCode) }));

//         setUsers(items);
//       } else {
//         console.log(data.message);
//       }
//     } catch (error) {
//       console.log('An error occurred. Please try again.');
//     }
//   }

//   const [users, setUsers] = useState([]);

//   const nest = (items, referralCode, link = 'referredBy') =>
//     items
//       .filter(item => item[link] === referralCode)
//       .map(item => ({ ...item, children: nest(items, item.referralCode) }));


//   useEffect(() => {
//     getAllUsers();
//   }, []);


//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-12">
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="card">
//                 <div className="card-header">
//                   <h4 className="card-title mb-0">Level</h4>
//                 </div>
//                 {/* <!-- end card header --> */}

//                 <div className="card-body">

//                    <Tree
//                     lineWidth={"2px"}
//                     lineColor={"green"}
//                     lineBorderRadius={"10px"}
//                     label={<StyledNode>Shree</StyledNode>}
//                   >
//                     <TreeNode label={<StyledNode>Vignesh</StyledNode>}>
//                       <TreeNode label={<StyledNode>Mahesh</StyledNode>} />
//                     </TreeNode>
//                     <TreeNode label={<StyledNode>Chetan</StyledNode>}>
//                       <TreeNode label={<StyledNode>Chandan</StyledNode>}>
//                         <TreeNode
//                           label={<StyledNode>Raksha</StyledNode>}
//                         />
//                         <TreeNode
//                           label={<StyledNode>Prasanna</StyledNode>}
//                         />
//                       </TreeNode>
//                     </TreeNode>
//                     <TreeNode label={<StyledNode>Praveen</StyledNode>}>
//                       <TreeNode
//                         label={<StyledNode>Shebin</StyledNode>}
//                       />
//                       <TreeNode
//                         label={<StyledNode>Chandara Shekhar</StyledNode>}
//                       />
//                     </TreeNode>
//                   </Tree> 
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LevelTree;

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
  const user = JSON.parse(localStorage.getItem('user')) 

  const getAllUsers = async () => {
    try {
      const referralId = user.referralCode
      const response = await fetch(base_url + 'users/referrals/'+referralId, {
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
                {users.length > 0 && users[0].children &&
                  <Tree
                    lineWidth={"2px"}
                    lineColor={"green"}
                    lineBorderRadius={"10px"}
                    label={<StyledNode>{users[0].username}</StyledNode>}
                  >
                    {renderTreeNodes(users[0].children)}
                  </Tree>
                }
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

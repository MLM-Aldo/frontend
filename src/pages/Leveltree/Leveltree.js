import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from 'styled-components'

function LevelTree() {
  const StyledNode = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    border: 1px solid red;
  `;

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
                    label={<StyledNode>Shree</StyledNode>}
                  >
                    <TreeNode label={<StyledNode>Vignesh</StyledNode>}>
                      <TreeNode label={<StyledNode>Mahesh</StyledNode>} />
                    </TreeNode>
                    <TreeNode label={<StyledNode>Chetan</StyledNode>}>
                      <TreeNode label={<StyledNode>Chandan</StyledNode>}>
                        <TreeNode
                          label={<StyledNode>Raksha</StyledNode>}
                        />
                        <TreeNode
                          label={<StyledNode>Prasanna</StyledNode>}
                        />
                      </TreeNode>
                    </TreeNode>
                    <TreeNode label={<StyledNode>Praveen</StyledNode>}>
                      <TreeNode
                        label={<StyledNode>Shebin</StyledNode>}
                      />
                      <TreeNode
                        label={<StyledNode>Chandara Shekhar</StyledNode>}
                      />
                    </TreeNode>
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

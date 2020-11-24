import React, { useRef, useState } from "react";
import Graph from "react-graph-vis";
import { Container, Grid, Divider, Table, Label } from "semantic-ui-react";
import Addnode from "./addnode";
import Findnode from "./findnode";
import Deletenode from "./deletenode"
import Solve from "./solvecontrols";
import "./BinaryTree.css";
import { addedge, resetNetwork, deletenode } from "./network";
import Navbar from '../../utils/Navbar';

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const graph = {
  nodes: [
  ],
  edges: [
  ]
};

var root = {
  id: null,
  children: []
}

function Binarytree() {
  const ref = useRef();
  var [data, setdata] = useState(root)
  const [solving, setsolving] = useState(false);
  let ColorArray = [];
  for (let i = 0; i < 7; i++) ColorArray.push('white');
  ColorArray[6] = 'pink';
  const [V, setV] = useState("");
  const options = {
    interaction: { hover: true },
    manipulation: {
      enabled: true,
      addNode: false,
      addEdge: false,
      editEdge: true,
      deleteNode: true,
      deleteEdge: true,
    },
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
      smooth: true,
      width: 1,
      arrows: { to: { enabled: true } },
    },
    // height: "100%",
  };
  var root_data = data.id
  return (
    <Container fluid>
      <Navbar text="Binary Search Tree" />
      <Grid padded celled container doubling width='100hw'>
        <Grid.Row stackable="true" columns={3} divided="true">
          <Grid.Column mobile={16} computer={4}>
            <Addnode onAddnode={async (node) => {
              ref.current.nodes.add(node)
              var newdata = data
              var updata = newdata
              var prev = newdata
              var dir
              while (newdata.id !== null) {
                prev = newdata
                ref.current.nodes.update({
                  id: newdata.id,
                  label: newdata.id,
                  color: "green"
                })
                await sleep(2 * 1000)
                resetNetwork(ref.current)
                if (parseInt(newdata.id) > parseInt(node.id)) {
                  let len = newdata.children.length;
                  while (len < 2) {
                    newdata.children.push({ id: null, children: [] })
                    len++;
                  }
                  newdata = newdata.children[0];
                  dir = "left";
                }
                else if (parseInt(newdata.id) < parseInt(node.id)) {
                  let len = newdata.children.length;
                  while (len < 2) {
                    newdata.children.push({ id: null, children: [] })
                    len++;
                  }
                  newdata = newdata.children[1];
                  dir = "right";
                }
                else {
                  break;
                }
              }
              if (prev !== newdata) {
                newdata.id = node.id
                const edge = {
                  from: prev.id,
                  to: newdata.id,
                  label: dir,
                };
                addedge(edge, ref.current, false);
              }
              if (newdata.id === null) {
                updata = {
                  id: node.id,
                  children: []
                }
              }
              console.log(data)
              console.log(updata)
              setdata(updata)
            }} />
          </Grid.Column>
          <Grid.Column mobile={16} computer={6} >
            <Findnode onFind={(node) => {
              resetNetwork(ref.current)
              const id_root = data.id;
              if (id_root === null) {
                alert("Node not found");
              }
              else {
                var newdata = data
                while (newdata.id !== null) {
                  resetNetwork(ref.current)
                  ref.current.nodes.update({
                    id: newdata.id,
                    label: newdata.id,
                    color: "green",
                  })
                  if (parseInt(newdata.id) === parseInt(node.id)) {
                    break;
                  }
                  else if (parseInt(newdata.id) > parseInt(node.id)) {
                    if (newdata.children.length !== 2) {
                      newdata = null;
                      break;
                    }
                    newdata = newdata.children[0]
                  }
                  else {
                    if (newdata.children.length !== 2) {
                      newdata = null;
                      break;
                    }
                    newdata = newdata.children[1]
                  }
                }
                if (newdata === null) {
                  resetNetwork(ref.current)
                  alert("Node not found")
                }
              }
            }}>Find node</Findnode>
            <Divider />
            <Solve
              solving={solving}
              time={true}
              solve={async (start, t) => {
                setsolving(true)
                setV(1)
                resetNetwork(ref.current)
                await sleep(t * 1000)
                const id_root = data.id;
                if (id_root === null) {
                  alert("Node not found");
                  setV(6)
                }
                else {
                  var newdata = data
                  while (newdata.id !== null) {
                    resetNetwork(ref.current)
                    ref.current.nodes.update({
                      id: newdata.id,
                      label: newdata.id,
                      color: "green",
                    })
                    setV(2)
                    await sleep(t * 1000)
                    if (parseInt(newdata.id) === parseInt(start)) {
                      setV(3)
                      await sleep(t * 1000)
                      break;
                    }
                    else if (parseInt(newdata.id) > parseInt(start)) {
                      setV(4)
                      await sleep(t * 1000)
                      if (newdata.children.length !== 2) {
                        newdata = null;
                        break;
                      }
                      newdata = newdata.children[0]
                    }
                    else {
                      setV(5)
                      await sleep(t * 1000)
                      if (newdata.children.length !== 2) {
                        newdata = null;
                        break;
                      }
                      newdata = newdata.children[1]
                    }
                  }
                  if (newdata === null) {
                    resetNetwork(ref.current)
                    alert("Node not found")
                  }
                }
                setV(6)
                setsolving(false)
              }}>Step find</Solve>
          </Grid.Column>
          <Grid.Column computer={6} mobile={16}>
            <Deletenode onDeletenode={(node) => {
              const id_root = data;
              if (id_root.id === null) {
                alert("Node not found");
              }
              else {
                var newdata = data
                var updata = newdata
                var prev = newdata
                var dir
                while (newdata.id !== null) {
                  if (parseInt(newdata.id) === parseInt(node.id)) {
                    break;
                  }
                  else if (parseInt(newdata.id) > parseInt(node.id)) {
                    if (newdata.children.length !== 2) {
                      newdata = null;
                      break;
                    }
                    prev = newdata
                    dir = "left"
                    newdata = newdata.children[0]
                  }
                  else {
                    if (newdata.children.length !== 2) {
                      newdata = null;
                      break;
                    }
                    prev = newdata
                    newdata = newdata.children[1]
                    dir = "right"
                  }
                }
                if (newdata === null) {
                  alert("Node not found2")
                }
                else {
                  console.log(newdata)
                  const delid = newdata.id
                  if (newdata.children.length !== 2) {
                    newdata.id = null
                  }
                  else {
                    if (newdata.children[1].id !== null) {
                      var tnode = newdata.children[1];
                      var lnode = tnode
                      while (tnode.id !== null) {
                        lnode = tnode;
                        if (tnode.children.length !== 2) {
                          break;
                        }
                        tnode = tnode.children[0]
                      }
                      deletenode(lnode.id, ref.current)
                      ref.current.nodes.add({ id: lnode.id, label: lnode.id })
                      if (prev !== newdata) {
                        const edge = {
                          from: prev.id,
                          to: lnode.id,
                          label: dir,
                        };
                        addedge(edge, ref.current, false);
                      }
                      if (newdata.children[0].id !== null && newdata.children[0].id !== lnode.id) {
                        const edge = {
                          from: lnode.id,
                          to: newdata.children[0].id,
                          label: "left",
                        };
                        addedge(edge, ref.current, false);
                      }
                      if (newdata.children[1].id !== null && newdata.children[1].id !== lnode.id) {
                        const edge = {
                          from: lnode.id,
                          to: newdata.children[1].id,
                          label: "right",
                        };
                        addedge(edge, ref.current, false);
                      }
                      newdata.id = lnode.id
                      lnode.id = null
                    }
                    else if (newdata.children[0].id !== null) {
                      var tenode = newdata.children[0];
                      var lnode = tenode
                      while (tenode.id !== null) {
                        lnode = tenode;
                        if (tenode.children.length !== 2) {
                          break;
                        }
                        tenode = tenode.children[1]
                      }
                      deletenode(lnode.id, ref.current)
                      ref.current.nodes.add({ id: lnode.id, label: lnode.id })
                      if (prev.id !== newdata.id) {
                        const edge = {
                          from: prev.id,
                          to: lnode.id,
                          label: dir,
                        };
                        addedge(edge, ref.current, false);
                      }
                      if (newdata.children[0].id !== null && newdata.children[0].id !== lnode.id) {
                        const edge = {
                          from: lnode.id,
                          to: newdata.children[0].id,
                          label: "left",
                        };
                        addedge(edge, ref.current, false);
                      }
                      if (newdata.children[1].id !== null && newdata.children[1].id !== lnode.id) {
                        const edge = {
                          from: lnode.id,
                          to: newdata.children[1].id,
                          label: "right",
                        };
                        addedge(edge, ref.current, false);
                      }
                      newdata.id = lnode.id
                      lnode.id = null
                    }

                  }
                  deletenode(delid, ref.current)
                  setdata(updata)
                  console.log(data)
                }
              }
            }}></Deletenode>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} >
          <Grid.Column computer={8} mobile={16}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.19.1/vis-network.min.css"></link>
            <Graph
              style={{ height: "80vh" }}
              graph={graph}
              options={options}
              ref={ref}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={8}><h2>The root is {root_data}</h2><Divider />
            <Table.Row size='small'><Table.Cell><Label ribbon color='green'>PSEUDO CODE</Label></Table.Cell></Table.Row>
            <Table size='small' >
              <Table.Body >
                <Table.Row textAlign='left'><Table.Cell height='5' bgcolor={ColorArray[(V + 5) % 7]} >
                  <pre>{"BEGIN"}</pre>
                </Table.Cell></Table.Row>
                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 4) % 7]} >
                  <pre>{"Binarysearch (Node ,Value)"}</pre>
                </Table.Cell></Table.Row>
                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 3) % 7]} >
                  <pre>{"\tif(Node.value === Value)\n"}</pre>
                  <pre>{"\t\treturn \"found\"\n"}</pre>
                </Table.Cell></Table.Row>
                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 2) % 7]} >
                  <pre>{"\telse if(Node.value > Value)\n"}</pre>
                  <pre>{"\t\tif(childrenof(Node)==0) return \"Not found\"\n"}</pre>
                  <pre>{"\t\tBinarysearch(Node.children[\"left\"],Value)"}</pre>
                </Table.Cell></Table.Row>
                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 1) % 7]} >
                  <pre>{"\telse \n"}</pre>
                  <pre>{"\t\tif(childrenof(Node)==0) return \"Not found\"\n"}</pre>
                  <pre>{"\t\tBinarysearch(Node.children[\"right\"],Value)"}</pre>
                </Table.Cell></Table.Row>
                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V) % 7]} >
                  <pre>{"END"}</pre>
                </Table.Cell></Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container >
  );
}

export default Binarytree;
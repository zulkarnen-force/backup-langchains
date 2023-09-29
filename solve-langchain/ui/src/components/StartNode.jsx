import { useCallback } from 'react';
import {Card} from 'react-bootstrap';
import { Handle, Position } from 'reactflow';


function StartNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Card>
        <Handle type='source' position={Position.Right}></Handle>
    <Card.Body>
      <Card.Text>Start</Card.Text>
    </Card.Body>
  </Card>
  );
}

export default StartNode;
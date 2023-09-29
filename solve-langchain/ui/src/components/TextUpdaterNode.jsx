import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import Card from 'react-bootstrap/Card';

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
   <Card>
    <Card.Header>
      Text Updater
    </Card.Header>
   </Card>
  );
}

export default TextUpdaterNode;

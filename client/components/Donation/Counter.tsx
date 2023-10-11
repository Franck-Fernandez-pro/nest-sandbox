import { animate } from 'framer-motion';
import { memo, useEffect, useRef } from 'react';

function Counter({ from, to }: { from: number; to: number }) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;

    if (node) {
      const controls = animate(from, to, {
        duration: 1,
        onUpdate(value) {
          node.textContent = parseInt(value.toFixed(0)).toLocaleString();
        },
      });

      return () => controls.stop();
    }
  }, [from, to]);

  return <div ref={nodeRef} />;
}

export default memo(Counter);

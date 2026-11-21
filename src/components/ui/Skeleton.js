// Grey pulsing placeholder block. Size and shape come from className.
const Skeleton = ({ className = "" }) => (
  <div aria-hidden="true" className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
);

export default Skeleton;

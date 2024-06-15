const preventDefaultPropagation = (
  e: React.MouseEvent<HTMLElement, MouseEvent>,
  propagation?: boolean
) => {
  if (propagation) {
    e.nativeEvent.stopImmediatePropagation();
    e.nativeEvent.preventDefault();
    e.preventDefault();
    e.stopPropagation();
  }
};

interface PropagationStopperProps extends React.HTMLAttributes<HTMLDivElement> {
  propagation?: boolean;
}

const PropagationStopper: React.FC<PropagationStopperProps> = ({
  children,
  onClick,
  propagation,
  ...props
}) => {
  return (
    <div
      {...props}
      onClick={(e) => {
        preventDefaultPropagation(e, propagation);
        if (onClick) onClick(e);
      }}
    >
      {children}
    </div>
  );
};

export { PropagationStopper };

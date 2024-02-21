import { useLocation, useOutlet } from 'react-router-dom';

export const useTransitionRef = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();

  return { nodeRef: null, currentOutlet, location };
};

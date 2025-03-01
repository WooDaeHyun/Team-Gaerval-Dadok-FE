import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import BottomNavigation from '@/ui/BottomNavigation';
import Toast from '../Toast';

const paths = ['/bookarchive', '/book/search', '/group', '/profile/me'];

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isShowNavigation = pathname && paths.includes(pathname);

  return (
    <Box h={isShowNavigation ? '100%' : '100dvh'}>
      <Box
        as={motion.div}
        key={pathname}
        px="2rem"
        pt="2rem"
        pb={isShowNavigation ? '9rem' : '2rem'}
        h="100%"
        overflow="auto"
        initial="initial"
        animate="animate"
        variants={{
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 1,
          },
        }}
      >
        {children}
      </Box>
      {isShowNavigation && <BottomNavigation />}
      <Toast />
    </Box>
  );
};

export default Layout;

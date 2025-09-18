import { useRouter } from 'next/navigation';
import { useTransition } from '@/components/route-transition-provider';

export function useTransitionRouter() {
  const router = useRouter();
  const { startTransition } = useTransition();
  
  const push = (href: string) => {
    startTransition('forward');
    setTimeout(() => {
      router.push(href);
    }, 50);
  };
  
  const replace = (href: string) => {
    startTransition('forward');
    setTimeout(() => {
      router.replace(href);
    }, 50);
  };
  
  return {
    push,
    replace,
    back: router.back,
    forward: router.forward,
    refresh: router.refresh,
    prefetch: router.prefetch,
  };
}
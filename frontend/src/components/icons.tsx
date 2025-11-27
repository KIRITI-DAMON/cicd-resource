
import type { SVGProps } from 'react';
import { BookCopy } from 'lucide-react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <BookCopy {...props} />
  );
}

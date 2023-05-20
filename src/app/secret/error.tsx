'use client';
import { Unauthorized } from '@/components/Unauthorized';

function Error(props: object) {
  return (
    <>
      <Unauthorized />
      {JSON.stringify({ props })}
    </>
  );
}

export default Error;

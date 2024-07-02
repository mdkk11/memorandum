import { getSession } from '@/libs/auth';
import { Headings } from './_components/Headings';
import { Heroes } from './_components/Heros';

export default async function TopPage() {
  const session = await getSession();

  return (
    <>
      <Headings session={session} />
      <Heroes />
    </>
  );
}

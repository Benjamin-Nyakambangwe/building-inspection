// sections
import { UserListView } from 'src/sections/user/view';

// ----------------------------------------------------------------------
async function getData() {
  const res = await fetch('http://127.0.0.1:8000/client/client-profiles-simple', {
    cache: 'no-store',
    // next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export const metadata = {
  title: 'Dashboard: User List',
};

export default async function UserListPage() {
  const data = await getData();
  return <UserListView data={data} />;
}

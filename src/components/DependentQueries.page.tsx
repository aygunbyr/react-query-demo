import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserByEmail = async (email: string) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = async (channelId: string) => {
  return await axios.get(`http://localhost:4000/channels/${channelId}`);
};

function DependentQueriesPage({ email }: { email: string }) {
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId;

  useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId, // converts to boolean, fetch only after channelId has been retrieved
  });
  return <div>DependentQueriesPage {user?.data.name}</div>;
}

export default DependentQueriesPage;

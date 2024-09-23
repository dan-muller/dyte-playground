import DyteMeeting from '~/Dyte';
import dyteApi from '~/dyte';
import {notFound} from 'next/navigation';

async function refreshParticipantAuthToken(meetingId: string, participantId: string) {
  const url = `/meetings/${meetingId}/participants/${participantId}/token`;
  const response = await dyteApi(url, { method: 'POST' });
  console.log(JSON.stringify(response));
  if (response.data?.success && response.data.data) {
    return response.data.data.token;
  }
  return null;
}

export default async function Page({params}: any) {
  const {meetingId, participantId} = params;
  console.log({meetingId, participantId});
  if (!meetingId || !participantId) notFound();
  const authToken = await refreshParticipantAuthToken(meetingId, participantId);
  console.log({authToken});
  if (!authToken) notFound();

  return <DyteMeeting authToken={authToken} showSetupScreen/>
}

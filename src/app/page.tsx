import dyte, {Meeting, Participant} from "~/dyte";
import Link from "next/link";

const getMeetings = async (pageSize: number = 5) => {
  const response = await dyte("/meetings", { method: "GET" });
  const data = response?.data?.data as Meeting[];
  if (!data?.length) return null;
  return Promise.all(
    data.slice(0, pageSize).map(async (meeting) => {
      const participantsResponse = await dyte(`/meetings/${meeting.id}/participants`, {method: "GET"});
      return {...meeting, participants: participantsResponse.data.data as Participant[]};
    })
  );
}

export default async function Home() {
  const meetings = await getMeetings();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {meetings?.map((meeting) => (
            <li key={meeting.id} className='mb-8'>
              <span className="text-lg sm:text-xl font-[weight:var(--font-weight-bold)]">{meeting.title}</span>
              <span className="text-xs sm:text-sm"> {meeting.participants.length} participants</span>
              <ul className="list-inside list-disc text-xs sm:text-sm pl-2">
                { meeting.participants.map((participant) => (
                  <Link className='hover:underline' href={`/${meeting.id}/${participant.id}`} key={participant.id}>
                    <li key={participant.id}>{participant.name}</li>
                  </Link>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}

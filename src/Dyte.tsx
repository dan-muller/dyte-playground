'use client';

import {ComponentProps, useEffect} from 'react';
import {DyteClientOptions} from "@dytesdk/web-core";
import {DyteMeeting} from '@dytesdk/react-ui-kit';
import {DyteProvider, useDyteClient} from '@dytesdk/react-web-core';

function useInitMeeting(options: DyteClientOptions) {
  const [meeting, initMeeting] = useDyteClient();

  useEffect(() => {
    initMeeting(options).catch(console.error).then(console.log);
  }, [options.authToken]);

  return meeting;
}

type DyteMeetingOptions = Omit<ComponentProps<typeof DyteMeeting>, 'meeting'>
export default function Dyte(props: DyteClientOptions & DyteMeetingOptions) {
  const meeting = useInitMeeting(props);
  return (
    <DyteProvider value={meeting}>
      <DyteMeeting {...props} meeting={meeting} />
    </DyteProvider>
  );
}

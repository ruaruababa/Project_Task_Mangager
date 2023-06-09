import {useEffect} from "react";
import {createSocketConnection} from "../services/socketService";
import useProfile from "./useProfile";

function listen(
  callBack: (payload: any) => void,
  channel: string,
  event: string
) {
  window.Echo.channel(channel).listen(event, (payload: any) => {
    callBack(payload);
  });

  return function cleanUp() {
    window.Echo.leaveChannel(`public-${channel}`);
  };
}

type Options = {
  callBack: (payload: any) => void;
};

export const useSocket = ({callBack}: Options) => {
  const {userProfile} = useProfile();

  useEffect(() => {
    createSocketConnection();

    return listen(callBack, `${userProfile?.id}`, ".notification-created");
  });
};

export default useSocket;

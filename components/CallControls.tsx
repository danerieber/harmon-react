import { Action, Presence, User } from "@/types/types";
import {
  Call,
  CallEnd,
  Headset,
  HeadsetOff,
  Mic,
  MicOff,
} from "@mui/icons-material";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { useState } from "react";

export default function CallControls({
  myUser,
  send,
  isInCall,
  setIsInCall,
  localStream,
  setLocalStream,
  peerId,
  userIsInCall,
  ringtone,
  isGettingCalled,
  remoteStreams,
  setRemoteStreams,
}: {
  myUser: User;
  send: (action: Action, data: any) => void;
  isInCall: boolean;
  setIsInCall: (isInCall: boolean) => void;
  localStream?: MediaStream;
  setLocalStream: (localStream: MediaStream) => void;
  peerId: string;
  userIsInCall: boolean;
  ringtone?: HTMLAudioElement;
  isGettingCalled: boolean;
  remoteStreams: Record<string, MediaStream>;
  setRemoteStreams: (remoteStreams: Record<string, MediaStream>) => void;
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const [joinSound] = useState(new Audio("/join.flac"));
  const [leaveSound] = useState(new Audio("/leave.flac"));

  function toggleIsInCall() {
    if (isInCall) {
      leaveSound.currentTime = 0;
      leaveSound.play();
      if (ringtone) {
        ringtone.pause();
      }
      setIsInCall(false);
      localStream?.getTracks().forEach((track) => track.stop());
      for (const peerId in remoteStreams) {
        const remoteStream = remoteStreams[peerId];
        remoteStream.getTracks().forEach((track) => track.stop());
      }
      setRemoteStreams({});
      send(Action.UpdateMyUserInfo, { ...myUser, presence: Presence.Online });
    } else {
      if (userIsInCall) {
        joinSound.currentTime = 0;
        joinSound.play();
        ringtone?.pause();
      } else if (ringtone) {
        ringtone.currentTime = 0;
        ringtone.play();
      }
      setIsInCall(true);
      navigator.mediaDevices
        .getUserMedia({
          video: false,
          audio: true,
        })
        .then(setLocalStream);
      send(Action.JoinCall, { peerId });
      send(Action.UpdateMyUserInfo, { ...myUser, presence: Presence.InCall });
    }
  }

  function toggleIsMuted() {
    setIsMuted(!isMuted);
  }

  function toggleIsDeafened() {
    setIsDeafened(!isDeafened);
  }

  return (
    <div className="flex gap-3 pt-1 justify-center bg-content1 rounded-t-xl">
      <Button
        isIconOnly
        size="md"
        color="primary"
        variant="solid"
        isDisabled={isInCall}
        className={clsx("text-foreground", isGettingCalled && "bg-green-500")}
        onPress={toggleIsInCall}
      >
        <Call />
      </Button>
      <Button
        isIconOnly
        size="md"
        color={isInCall || isGettingCalled ? "danger" : "primary"}
        variant="solid"
        isDisabled={!isInCall && !isGettingCalled}
        className="text-foreground"
        onPress={isGettingCalled ? () => ringtone?.pause() : toggleIsInCall}
      >
        <CallEnd />
      </Button>
      <Button
        isIconOnly
        size="md"
        radius="full"
        color={isMuted || isDeafened ? "default" : "primary"}
        variant="solid"
        isDisabled={!isInCall || isDeafened}
        onPress={toggleIsMuted}
      >
        {isMuted || isDeafened ? <MicOff /> : <Mic />}
      </Button>
      <Button
        isIconOnly
        size="md"
        radius="full"
        color={isDeafened ? "default" : "primary"}
        variant="solid"
        isDisabled={!isInCall}
        onPress={toggleIsDeafened}
      >
        {isDeafened ? <HeadsetOff /> : <Headset />}
      </Button>
    </div>
  );
}

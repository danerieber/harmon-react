import { IsTalking, Presence, User } from "@/types/types";
import PresenceIcon from "./PresenceIcon";
import Username from "./Username";
import { getBannerBackground } from "@/styles/computed";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import moment from "moment";

export default function UserElement({
  user,
  audio,
  isCalling,
}: {
  user: User;
  audio?: HTMLAudioElement;
  isCalling: boolean;
}) {
  const [isTalking, setIsTalking] = useState<IsTalking>({
    value: false,
    time: moment(),
  });

  const context = useRef<AudioContext>();
  const analyser = useRef<AnalyserNode>();

  // Add a cooldown to when the talking indicator goes off to prevent flickering
  function getIsTalking(prev: IsTalking, nextValue: boolean) {
    if (nextValue || moment().diff(prev.time, "ms") > 200) {
      return { value: nextValue, time: moment() };
    }
    return prev;
  }

  // Detect when a user is talking
  useEffect(() => {
    if (audio && audio.srcObject) {
      context.current = new AudioContext();
      const source = context.current.createMediaStreamSource(
        audio.srcObject as MediaStream,
      );
      analyser.current = context.current.createAnalyser();
      analyser.current.fftSize = 128;
      source.connect(analyser.current);

      const len = analyser.current.frequencyBinCount;
      const buf = new Uint8Array(len);
      const detectTalking = () => {
        if (!analyser.current) return;
        analyser.current.getByteFrequencyData(buf);
        const avgVolume = buf.reduce((sum, amp) => sum + amp, 0) / len;
        setIsTalking((prev) => getIsTalking(prev, avgVolume > 35));
        requestAnimationFrame(detectTalking);
      };
      detectTalking();
    } else {
      analyser.current?.disconnect();
      context.current?.close();
      analyser.current = undefined;
      context.current = undefined;
    }
  }, [audio]);

  return (
    <div
      className="!bg-cover !bg-center"
      style={
        user.presence !== Presence.Offline
          ? { background: getBannerBackground(user.bannerUrl) }
          : {}
      }
    >
      <div
        className={clsx(
          "m-1 px-1 flex items-center",
          isTalking.value &&
            "outline outline-2 outline-offset-2 outline-cyan-500",
        )}
      >
        <div className="flex-grow flex flex-col min-w-0">
          <div className="flex gap-2">
            <PresenceIcon presence={user.presence} ping={isCalling} />
            <Username username={user.username} color={user.usernameColor} />
          </div>
          <p className="text-ellipsis overflow-hidden flex-grow ml-5">
            {user.presence !== Presence.Offline ? user.status : "offline"}
            <span className="select-none">&nbsp;</span>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import usePresenceHeartbeat from "../../../admin/users/hooks/usePresenceHeartbeat";

export default function PresenceHeartbeatMount() {
  usePresenceHeartbeat();
  return null;
}